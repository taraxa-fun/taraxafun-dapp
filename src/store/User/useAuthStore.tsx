import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { servUrl } from "@/config/servUrl";
import { UserProfile } from "@/type/user";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AuthStore {
  jwt: string | null;
  address: string | null;
  userMe: UserProfile | null;
  loading: boolean;
  isProfileUpdating: boolean; // Nouveau boolean

  initAuth: (
    address: string,
    signMessage: (params: { message: string }) => Promise<string>
  ) => Promise<void>;
  verifyJwt: () => boolean;
  fetchUserMe: () => Promise<void>;
  fetchUserProfile: (username: string) => Promise<UserProfile | null>;
  updateUserMe: (updates: {
    username?: string;
    description?: string;
  }) => Promise<{
    success: boolean;
    data?: any;
    error?: any;
  }>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      jwt: null,
      address: null,
      userMe: null,
      loading: false,
      isProfileUpdating: false,

      verifyJwt: (): boolean => {
        const { jwt } = get();
        if (!jwt) return false;

        try {
          const decoded = jwtDecode<JwtPayload>(jwt);
          const currentTime = Date.now() / 1000;

          if (decoded.exp && decoded.exp < currentTime) {
            set({ jwt: null });
            return false;
          }

          return true;
        } catch (error) {
          console.error("JWT verification failed:", error);
          set({ jwt: null });
          return false;
        }
      },

      initAuth: async (address, signMessage) => {
        set({ loading: true });
        const isValid = get().verifyJwt();
        if (isValid) {
          set({ address, loading: false });
          await get().fetchUserMe();
          return;
        }
        try {
          const { data: nonceResponse } = await axios.get(
            `${servUrl}/auth/nonce/${address}`,
            { headers: { "Content-Type": "application/json" } }
          );

          if (!nonceResponse.nonce) {
            console.error("Nonce not found in response.");
          }

          const signature = await signMessage({ message: nonceResponse.nonce });

          const response = await axios.post(
            `${servUrl}/auth/sign-in`,
            { wallet: address, signature },
            { headers: { "Content-Type": "application/json" } }
          );

          const { token } = response.data;

          if (token) {
            set({ jwt: token, address, loading: false });
            await get().fetchUserMe();
          } else {
            console.error("JWT not found in response.");
          }
        } catch (error) {
          console.error("Auth error:", error);
          set({ loading: false });
        }
      },

      fetchUserMe: async () => {
        const { jwt } = get();
        if (!jwt) return;

        try {
          set({ loading: true });
          const response = await axios.get(`${servUrl}/user/me`, {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": jwt,
            },
          });

          set({ userMe: response.data, loading: false });
        } catch (error) {
          console.error("Error fetching userMe data:", error);
          set({ loading: false });
        }
      },

      fetchUserProfile: async (username: string) => {
        try {
          const response = await axios.get(`${servUrl}/user/${username}`, {
            headers: { "Content-Type": "application/json" },
          });
          return response.data;
        } catch (error) {
          console.error("Error fetching user profile data:", error);
          return null;
        }
      },

      updateUserMe: async (updates, callback?: () => void) => {
        const { jwt } = get();
        if (!jwt) {
          return { success: false, error: "User is not authenticated." };
        }
      
        set({ isProfileUpdating: true });
      
        try {
          const response = await axios.put(`${servUrl}/user/me`, updates, {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": jwt,
            },
          });
      
          const updatedUser = response.data;
      
          set({
            userMe: updatedUser,
            isProfileUpdating: false,
          });
      
          if (callback) {
            callback();
          }
      
          return { success: true, data: updatedUser };
        } catch (error) {
          console.error("Error updating user:", error);
          set({ isProfileUpdating: false });
          return { success: false, error };
        }
      },

      logout: () => {
        set(() => ({
          jwt: null,
          address: null,
          userMe: null,
        }));
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        jwt: state.jwt,
      }),
    }
  )
);
