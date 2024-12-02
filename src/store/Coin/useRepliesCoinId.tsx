import { create } from 'zustand';
import { Reply } from '@/type/reply';

interface RepliesState {
  replies: Reply[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  setReplies: (replies: Reply[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setIsLoading: (loading: boolean) => void;
  getCurrentPageReplies: () => Reply[];
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const useRepliesStoreCoinId = create<RepliesState>((set, get) => ({
  replies: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  setReplies: (replies) => set({ replies }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  getCurrentPageReplies: () => {
    const { replies, currentPage } = get();
    const pageSize = 5;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return replies.slice(startIndex, endIndex);
  },
  goToNextPage: () => {
    const { currentPage, totalPages } = get();
    if (currentPage < totalPages) {
      set({ currentPage: currentPage + 1 });
    }
  },
  goToPreviousPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 });
    }
  },
}));

export { useRepliesStoreCoinId };