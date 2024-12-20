import { wsUrl } from "@/config/servUrl";
import { create } from "zustand";

export interface WebSocketCandle {
  open: bigint;
  high: bigint;
  low: bigint;
  close: bigint;
  volume: string;
  startTime: string;
  lastUpdate: string;
  lastPrice: string;
}

interface WebSocketMessage {
  type: string;
  data: {
    type: "CANDLE_UPDATE" | "NEW_CANDLE";
    candle: WebSocketCandle;
  };
}

interface WebSocketStore {
  isConnected: boolean;
  latestCandle1m: {
    type: "CANDLE_UPDATE" | "NEW_CANDLE";
    candle: WebSocketCandle;
  } | null;
  subscribeToCandle: (tokenAddress: string) => void;
  unsubscribeFromCandle: (tokenAddress: string) => void;
  tokenWs: WebSocket | null;
  hasNewCandle: boolean;
  initWebSockets: () => void;
  cleanup: () => void;
}

export const useWebSocketCandlesStore = create<WebSocketStore>((set, get) => ({
  isConnected: false,
  latestCandle1m: null,
  tokenWs: null,
  hasNewCandle: false,

  subscribeToCandle: (tokenAddress: string) => {
    const { tokenWs } = get();
    if (tokenWs && tokenWs.readyState === WebSocket.OPEN) {
      const message = {
        type: "SUBSCRIBE_CANDLE",
        token_address: tokenAddress,
      };
      console.log("message", message);
      tokenWs.send(JSON.stringify(message));
    }
  },

  unsubscribeFromCandle: () => {
    const { tokenWs } = get();
    if (tokenWs && tokenWs.readyState === WebSocket.OPEN) {
      const message = {
        type: "UNSUBSCRIBE_CANDLE",
      };
      tokenWs.send(JSON.stringify(message));
    }
  },

  initWebSockets: () => {
    const state = get();

    if (!state.tokenWs) {
      const tokenWs = new WebSocket(`${wsUrl}/candle-1m`);

      tokenWs.onopen = () => {
        set({ tokenWs, isConnected: true });
      };

      tokenWs.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          if (message.type === "candle1M") {
            set({
              latestCandle1m: message.data,
              hasNewCandle: true,
            });
            setTimeout(() => {
              set({ hasNewCandle: false });
            }, 100);
          }
        } catch (error) {
          return error;
        }
      };

      tokenWs.onclose = () => {
        set({ tokenWs: null, isConnected: false });
        setTimeout(() => get().initWebSockets(), 5000);

      };
    }
  },

  cleanup: () => {
    const { tokenWs } = get();
    if (tokenWs) {
      tokenWs.close();
    }
    set({
      tokenWs: null,
      latestCandle1m: null,
      hasNewCandle: false,
      isConnected: false,
    });
  },
}));
