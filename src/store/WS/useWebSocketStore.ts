import { create } from 'zustand';

interface TokenMessage {
  _id: string;
  address: string;
  created_at: string;
  description: string;
  name: string;
  supply: string;
  symbol: string;
  creator: {
    _id: string;
    username: string;
  };
}

interface TradeMessage {
  _id: string;
  type: 'buy' | 'sell';
  created_at: string;
}

interface WebSocketStore {
  latestTokens: TokenMessage[];
  latestTrades: TradeMessage[];
  tokenWs: WebSocket | null;
  tradeWs: WebSocket | null;
  initWebSockets: () => void;
  cleanup: () => void;
}

export const useWebSocketStore = create((set, get) => ({
  latestTokens: [],
  latestTrades: [],
  tokenWs: null,
  tradeWs: null,

  initWebSockets: () => {
    // Ne pas réinitialiser si les connexions existent déjà
    const state = get();
    
    // WebSocket pour les tokens
    if (!state.tokenWs) {
      const tokenWs = new WebSocket('ws://taraxafun-server-590541650183.us-central1.run.app/ws/create-fun');

      tokenWs.onopen = () => {
        console.log('Token WebSocket Connected');
      };

      tokenWs.onmessage = (event) => {
        const data = JSON.parse(event.data) as TokenMessage;
        set(state => ({
          latestTokens: [data, ...state.latestTokens].slice(0, 5)
        }));
        console.log("latest tokens",data);
      };

      tokenWs.onclose = () => {
        console.log('Token WebSocket Disconnected');
        set(state => ({ tokenWs: null }));
        setTimeout(() => get().initWebSockets(), 5000);
      };

      set({ tokenWs });
    }

    if (!state.tradeWs) {
      const tradeWs = new WebSocket('ws://taraxafun-server-590541650183.us-central1.run.app/ws/trade-call');

      tradeWs.onopen = () => {
        console.log('Trade WebSocket Connected');
      };

      tradeWs.onmessage = (event) => {
        const data = JSON.parse(event.data) as TradeMessage;
        set(state => ({
          latestTrades: [data, ...state.latestTrades].slice(0, 5)
        }));
        console.log("data from ws",data);
      };

      tradeWs.onclose = () => {
        console.log('Trade WebSocket Disconnected');
        set(state => ({ tradeWs: null }));
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
  }
})) satisfies { getState: () => WebSocketStore };