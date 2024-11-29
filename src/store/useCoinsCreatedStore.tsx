// store/useCoinsCreatedStore.ts
import { create } from 'zustand';
import { TokenType } from "@/type/tokenType";

interface CoinsCreatedStore {
  coins: TokenType[];
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  setCoins: (coins: TokenType[]) => void;
  getCurrentPageCoins: () => TokenType[];
  getTotalPages: () => number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  fetchCoins: () => Promise<void>;
}

export const useCoinsCreatedStore = create<CoinsCreatedStore>((set, get) => ({
  coins: [],
  currentPage: 1,
  itemsPerPage: 5,
  isLoading: false,

  setCoins: (coins) => set({ coins }),

  getCurrentPageCoins: () => {
    const { coins, currentPage, itemsPerPage } = get();
    const indexOfLastCoin = currentPage * itemsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - itemsPerPage;
    return coins.slice(indexOfFirstCoin, indexOfLastCoin);
  },

  getTotalPages: () => {
    const { coins, itemsPerPage } = get();
    return Math.ceil(coins.length / itemsPerPage);
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

  fetchCoins: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));