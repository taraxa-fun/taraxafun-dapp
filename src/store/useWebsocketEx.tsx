import { create } from 'zustand';

interface WebSocketState {
  wsConnection: WebSocket | null;
  messages: any[];
  error: any | null;
  openWebSocket: (url: string) => void;
  closeWebSocket: () => void;
  sendMessage: (message: any) => void;
  onMessageReceived: (message: any) => void;
  onError: (error: any) => void;
  onClose: () => void;
}

const useWebSocketStore = create<WebSocketState>((set, get) => ({
  wsConnection: null,
  messages: [],
  error: null,
  openWebSocket: (url) => {
    const ws = new WebSocket(url);
    set({ wsConnection: ws });

    ws.onmessage = (event) => {
      set((state) => ({ messages: [...state.messages, event.data] }));
      get().onMessageReceived(event.data);
    };

    ws.onerror = (error) => {
      set({ error });
      get().onError(error);
    };

    ws.onclose = () => {
      set({ wsConnection: null });
      get().onClose();
    };
  },
  closeWebSocket: () => {
    const { wsConnection } = get();
    if (wsConnection) {
      wsConnection.close();
      set({ wsConnection: null });
    }
  },
  sendMessage: (message) => {
    const { wsConnection } = get();
    if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
      wsConnection.send(message);
    }
  },
  onMessageReceived: () => {},
  onError: () => {},
  onClose: () => {},
}));

export default useWebSocketStore;