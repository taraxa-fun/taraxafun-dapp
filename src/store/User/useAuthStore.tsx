import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { servUrl } from "@/config/servUrl";
import { UserProfile } from "@/type/user";

interface AuthStore {
  jwt: string | null;
  address: string | null;
  userMe: UserProfile | null;
  loading: boolean;

  initAuth: (
    address: string,
    signMessage: (params: { message: string }) => Promise<string>
  ) => Promise<void>;
  fetchUserMe: () => Promise<void>;
  fetchUserProfile: (username: string) => Promise<UserProfile | null>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      jwt: null,
      address: null,
      userMe: null,
      loading: false,

      initAuth: async (address, signMessage) => {
        set({ loading: true });
        try {
          const { data: nonceResponse } = await axios.get(
            `${servUrl}/auth/nonce/${address}`,
            { headers: { "Content-Type": "application/json" } }
          );

          if (!nonceResponse.nonce) {
            throw new Error("Nonce not found in response.");
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
            throw new Error("JWT not found in response.");
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
          console.log("appelé user Me", response);
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
        address: state.address,
        userMe: state.userMe,
      }),
    }
  )
);
