import { Trade } from '@/type/trade';
import { create } from 'zustand';


interface TradesState {
  trades: Trade[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  setTrades: (trades: Trade[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setIsLoading: (loading: boolean) => void;
  getCurrentPageTrades: () => Trade[];
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const useTradesStore = create<TradesState>((set, get) => ({
  trades: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  setTrades: (trades) => set({ trades }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  getCurrentPageTrades: () => {
    const { trades, currentPage } = get();
    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return trades.slice(startIndex, endIndex);
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

export { useTradesStore };