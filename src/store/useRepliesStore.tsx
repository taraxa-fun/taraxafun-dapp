import { Reply } from '@/type/reply';
import { create } from 'zustand';


interface RepliesStore {
  replies: Reply[];
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  setReplies: (replies: Reply[]) => void;
  getCurrentPageReplies: () => Reply[];
  getTotalPages: () => number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  fetchReplies: () => Promise<void>;
}

export const useRepliesStore = create<RepliesStore>((set, get) => ({
  replies: [],
  currentPage: 1,
  itemsPerPage: 5,
  isLoading: false,

  setReplies: (replies) => set({ replies }),

  getCurrentPageReplies: () => {
    const { replies, currentPage, itemsPerPage } = get();
    const indexOfLastReply = currentPage * itemsPerPage;
    const indexOfFirstReply = indexOfLastReply - itemsPerPage;
    return replies.slice(indexOfFirstReply, indexOfLastReply);
  },

  getTotalPages: () => {
    const { replies, itemsPerPage } = get();
    return Math.ceil(replies.length / itemsPerPage);
  },

  goToNextPage: () => {
    const { currentPage, getTotalPages } = get();
    if (currentPage < getTotalPages()) {
      set({ currentPage: currentPage + 1 });
    }
  },

  goToPreviousPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 });
    }
  },

  fetchReplies: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));