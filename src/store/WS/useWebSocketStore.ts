import { create } from "zustand";

interface TokenMessage {
  _id: string;
  address: string;
  description: string;
  marketcap: string;
  name: string;
  supply: string;
  symbol: string;
  user: {
    wallet: string;
    username: string;
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
    wallet: `0x${string}` ;
    avatar: string;
  };
  token: {
    _id: string;
    address: `0x${string}`;
    marketcap: string;
    symbol: string;
  };
  __v: number;
}

interface WebSocketStore {
  latestTokens: TokenMessage | null;
  latestTrades: TradeData[];
  tokenWs: WebSocket | null;
  tradeWs: WebSocket | null;
  initWebSockets: () => void;
  cleanup: () => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  latestTokens: null,
  latestTrades: [],
  tokenWs: null,
  tradeWs: null,

  initWebSockets: () => {
    const state = get();

    // WebSocket pour les tokens
    if (!state.tokenWs) {
      const tokenWs = new WebSocket(
        "wss://taraxafun-server-590541650183.us-central1.run.app/ws/create-fun"
      );

      tokenWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "funCreated") {
          const tokenData = message.data as TokenMessage;
          set({ latestTokens: tokenData });
        }
      };
      

      tokenWs.onclose = () => {
        set((state) => ({ tokenWs: null }));
        setTimeout(() => get().initWebSockets(), 5000);
      };

      set({ tokenWs });
    }

    // WebSocket pour les trades
    if (!state.tradeWs) {
      const tradeWs = new WebSocket(
        "wss://taraxafun-server-590541650183.us-central1.run.app/ws/trade-call"
      );

      tradeWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "tradeCall") {
          const tradeData = message.data as TradeData;
          set((state) => ({
            latestTrades: [tradeData, ...state.latestTrades],
          }));
          console.log(tradeData)
        }
      };

      tradeWs.onerror = (event) => {
        console.error("Trade WS error", event);
      }

      tradeWs.onopen = () => {
        console.log("Trade WS connected");
      }

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
    set({ tokenWs: null, tradeWs: null });
  },
}));
