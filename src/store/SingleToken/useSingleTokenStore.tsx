import { create } from "zustand";
import axios from "axios";
import { servUrl } from "@/config/servUrl";
import { TradeData } from "@/type/WS/TradeMessage";

interface Creator {
  _id: string;
  username: string;
  avatar: string;
}

interface Comment {
  _id: string;
  content: string;
  likes: number;
  user: string;
  token: string;
  created_at: string;
}

interface TokenData {
  _id: string;
  address: `0x${string}`;
  created_at: string;
  description: string;
  image: string;
  listed: boolean;
  telegram?: string;
  twitter?: string;
  website?: string;
  name: string;
  supply: string;
  symbol: string;
  marketcap?: string;
  user: Creator;
  comments: Comment[];
  trades: TradeData[];
  replies_count?: number;
  pump_emperor?: string;
}

interface TokenState {
  tokenData: TokenData | null;
  singleTokenisLoading: boolean;
  error: string | null;
  fetchTokenData: (address: string) => Promise<void>;
  clearData: () => void;
}

export const useSingleTokenStore = create<TokenState>((set) => ({
  tokenData: null,
  singleTokenisLoading: false,
  error: null,

  fetchTokenData: async (address: string) => {
    set({ singleTokenisLoading: true, error: null });
    try {
      const response = await axios.get<TokenData>(
        `${servUrl}/token/${address}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      set({
        tokenData: response.data,
        singleTokenisLoading: false,
      });
    } catch (error) {
      console.error("Error fetching token data:", error);
      set({
        error: "Failed to fetch token data",
        singleTokenisLoading: false,
      });
    }
  },

  clearData: () =>
    set({
      tokenData: null,
      error: null,
    }),
}));
