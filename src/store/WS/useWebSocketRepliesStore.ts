import { create } from "zustand";

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

interface CommentWebSocketStore {
  latestComments: CommentMessage[];
  hasNewComment: boolean;
  commentWs: WebSocket | null;
  initCommentWebSocket: () => void;
  cleanupCommentWebSocket: () => void;
}

export const useCommentWebSocketStore = create<CommentWebSocketStore>((set, get) => ({
  latestComments: [],
  hasNewComment: false,
  commentWs: null,

  initCommentWebSocket: () => {
    const state = get();

    if (!state.commentWs) {
      const commentWs = new WebSocket(
        "wss://taraxafun-server-590541650183.us-central1.run.app/ws/comment-created"
      );

      commentWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "commentCreated") {
          const commentData = message.data as CommentMessage[]; // Le message entier est déjà un tableau
          set((state) => ({
            latestComments: [...commentData, ...state.latestComments], // Ajoute les nouveaux commentaires au début
            hasNewComment: true,
          }));

          setTimeout(() => {
            set({ hasNewComment: false });
          }, 100);
        }
      };

      commentWs.onerror = (event) => {
        console.error("Comment WS error", event);
      };

      commentWs.onopen = () => {
        console.log("Comment WS connected");
      };

      commentWs.onclose = () => {
        set({ commentWs: null });
        setTimeout(() => get().initCommentWebSocket(), 5000);
      };

      set({ commentWs });
    }
  },

  cleanupCommentWebSocket: () => {
    const { commentWs } = get();
    if (commentWs) {
      commentWs.close();
    }
    set({ commentWs: null, latestComments: [] }); // Réinitialise aussi le tableau
  },
}));