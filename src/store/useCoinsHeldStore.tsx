// store/useCoinsHeldStore.ts
import { create } from 'zustand';
import { CoinHeld } from "@/type/coinHeld";

interface CoinsHeldStore {
 coins: CoinHeld[];
 currentPage: number;
 itemsPerPage: number;
 isLoading: boolean;
 setCoins: (coins: CoinHeld[]) => void;
 getCurrentPageCoins: () => CoinHeld[];
 getTotalPages: () => number;
 goToNextPage: () => void;
 goToPreviousPage: () => void;
 fetchCoins: () => Promise<void>;
}

export const useCoinsHeldStore = create<CoinsHeldStore>((set, get) => ({
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

 // Pour plus tard avec la BDD
 fetchCoins: async () => {
   set({ isLoading: true });
   try {
     // const response = await axios.get('/api/coins');
     // const data = await response.json();
     // set({ coins: data });
     await new Promise(resolve => setTimeout(resolve, 1000));
   } catch (error) {
     console.error('Error fetching coins:', error);
   } finally {
     set({ isLoading: false });
   }
 }
}));