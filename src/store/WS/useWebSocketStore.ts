import { wsUrl } from "@/config/servUrl";
import { create } from "zustand";

interface TokenMessage {
  _id: string;
  address: string;
  description: string;
  marketcap: string;
  name: string;
  supply: string;
  symbol: string;
  replies_count: number;
  image: string;
  user: {
    avatar?: string;
    wallet: string;
    username: string;
  };
  created_at: string;
}

interface CommentMessage {
  _id: string;
  address: string;
  created_at: string;
  description: string;
  marketcap: string;
  name: string;
  supply: string;
  symbol: string;
  telegram: string;
  twitter: string;
  website: string;
  image: string;
  user: {
    username: string;
    wallet: string;
  };
}

export interface TradeData {
  _id: string;
  type: "buy" | "sell";
  outAmount: string;
  inAmount: string;
  index: string;
  hash: `0x${string}`;
  created_at: string;
  user: {
    username: string;
    _id: string;
    wallet: `0x${string}`;
    avatar: string;
  };
  token: {
    _id: string;
    address: `0x${string}`;
    marketcap: string;
    symbol: string;
    image: string;
    replies_count?: number;
    description?: string;
  };
  __v: number;
}

interface WebSocketStore {
  hasNewToken: boolean;
  latestTokens: TokenMessage | null;
  latestTrade: TradeData | null;
  latestComment: CommentMessage | null;
  tokenWs: WebSocket | null;
  tradeWs: WebSocket | null;
  commentWs: WebSocket | null;
  initWebSockets: () => void;
  cleanup: () => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  hasNewToken: false,
  latestTokens: null,
  latestTrade: null,
  latestComment: null,
  tokenWs: null,
  tradeWs: null,
  commentWs: null,

  initWebSockets: () => {
    const state = get();

    // WebSocket pour les tokens
    if (!state.tokenWs) {
      const tokenWs = new WebSocket(`${wsUrl}/create-fun`);

      tokenWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "funCreated") {
          const tokenData = message.data as TokenMessage;
          set({
            latestTokens: tokenData,
            hasNewToken: true,
          });

          setTimeout(() => {
            set({ hasNewToken: false });
          }, 100);
        }
      };

      tokenWs.onclose = () => {
        set((state) => ({ tokenWs: null }));
        setTimeout(() => get().initWebSockets(), 5000);
      };

      set({ tokenWs });
    }

    if (!state.tradeWs) {
      const tradeWs = new WebSocket(`${wsUrl}/trade-call`);

      tradeWs.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "tradeCall") {
          const tradeData = message.data as TradeData;
          set({ latestTrade: tradeData });
        }
      };

      tradeWs.onclose = () => {
        set((state) => ({ tradeWs: null }));
        setTimeout(() => get().initWebSockets(), 5000);
      };

      set({ tradeWs });
    }
  },

  cleanup: () => {
    const { tokenWs, tradeWs } = get();
    if (tokenWs) {
      tokenWs.close();
    }
    if (tradeWs) {
      tradeWs.close();
    }
    set({ tokenWs: null, tradeWs: null, latestTrade: null });
  },
}));
