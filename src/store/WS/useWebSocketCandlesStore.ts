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
    type: string;
    candle: WebSocketCandle;
  };
}

interface WebSocketStore {
  latestCandle1m: WebSocketCandle | null; // Une seule bougie
  tokenWs: WebSocket | null;
  hasNewCandle: boolean;
  initWebSockets: () => void;
  cleanup: () => void;
}

export const useWebSocketCandlesStore = create<WebSocketStore>((set, get) => ({
  latestCandle1m: null, // Initialise avec `null`
  tokenWs: null,
  hasNewCandle: false,

  initWebSockets: () => {
    const state = get();

    if (!state.tokenWs) {
      const tokenWs = new WebSocket(`${wsUrl}/candle-1m`);

      tokenWs.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          if (
            message.type === "candle1M" &&
            message.data.type === "NEW_CANDLE"
          ) {
            const newCandle = message.data.candle;

            set({
              latestCandle1m: newCandle,
              hasNewCandle: true,
            });
            setTimeout(() => {
              set({ hasNewCandle: false });
            }, 100);
          }
        } catch (error) {
          return error 
        }
      };
      tokenWs.onclose = () => {
        set({ tokenWs: null });
        setTimeout(() => get().initWebSockets(), 5000);
      };

      tokenWs.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      set({ tokenWs });
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
    });
  },
}));
