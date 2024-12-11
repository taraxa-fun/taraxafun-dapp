import { create } from "zustand";

interface TokenMessage {
  _id: string;
  address: string;
  created_at: string;
  description?: string;
  name?: string;
  supply?: string;
  symbol: string;
  creator?: {
    _id: string;
    username: string;
  };
}

interface TradeData {
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
  latestTokens: TokenMessage[];
  latestTrades: TradeData[];
  tokenWs: WebSocket | null;
  tradeWs: WebSocket | null;
  initWebSockets: () => void;
  cleanup: () => void;
}

// Store Implementation
export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  latestTokens: [],
  latestTrades: [],
  tokenWs: null,
  tradeWs: null,

  initWebSockets: () => {
    const state = get();

    // WebSocket pour les tokens
    if (!state.tokenWs) {
      const tokenWs = new WebSocket(
        "ws://taraxafun-server-590541650183.us-central1.run.app/ws/create-fun"
      );

      tokenWs.onopen = () => {
        console.log("Token WebSocket Connected");
      };

      tokenWs.onmessage = (event) => {
        const data = JSON.parse(event.data) as TokenMessage;
        set((state) => ({
          latestTokens: [data, ...state.latestTokens],
        }));
        console.log("Latest tokens:", data);
      };
      
      tokenWs.onclose = () => {
        console.log("Token WebSocket Disconnected");
        set((state) => ({ tokenWs: null }));
        setTimeout(() => get().initWebSockets(), 5000);
      };

      set({ tokenWs });
    }

    // WebSocket pour les trades
    if (!state.tradeWs) {
      const tradeWs = new WebSocket(
        "ws://taraxafun-server-590541650183.us-central1.run.app/ws/trade-call"
      );

      tradeWs.onopen = () => {
        console.log("Trade WebSocket Connected");
      };

      tradeWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "tradeCall") {
          const tradeData = message.data as TradeData;
          set((state) => ({
            latestTrades: [tradeData, ...state.latestTrades],
          }));
          console.log("Latest trades:", tradeData);
        }
      };

      tradeWs.onclose = () => {
        console.log("Trade WebSocket Disconnected");
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
