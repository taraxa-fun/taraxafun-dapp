import { create } from "zustand";
import axios from "axios";
import { servUrl } from "@/config/servUrl";

interface Reply {
  _id: string;
  content: string;
  likes: number;
  user: UserForReply;
  token: string;
  created_at: string;
  __v: number;
}

interface UserForReply {
  _id: string;
  username: string;
  wallet: string;
  avatar: string;
}

interface ReplyState {
  replies: Reply[];
  repliesIsLoading: boolean;
  error: string | null;
  fetchReplies: (address: string) => Promise<void>;
  createReply: (jwt: string, tokenAddress: string, content: string) => Promise<boolean>;
  clearReplies: () => void;
}

export const useRepliesTokenIdStore = create<ReplyState>((set, get) => ({
  replies: [],
  repliesIsLoading: false,
  error: null,

  fetchReplies: async (address: string) => {
    set({ repliesIsLoading: true, error: null });
    try {
      const response = await axios.get(`${servUrl}/comment/${address}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set({ replies: response.data, repliesIsLoading: false });
    } catch (error) {
      console.error("Error fetching replies:", error);
      set({
        error: "Failed to fetch replies",
        repliesIsLoading: false,
      });
    }
  },

  createReply: async (jwt: string, address: string, content: string): Promise<boolean> => {
    if (!jwt || !address || !content.trim()) {
      console.error("Missing required parameters for creating a reply.");
      return false;
    }
  
    try {
      await axios.post(
        `${servUrl}/comment/create`,
        { content: content, address : address },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": jwt,
          },
        }
      );
      
      const fetchReplies = get().fetchReplies;
      await fetchReplies(address);
      return true;
    } catch (error) {
      console.error("Error creating reply:", error);
      set({ error: "Failed to create reply" });
      return false;
    }
  },

  clearReplies: () => set({ replies: [], error: null }),
}));
