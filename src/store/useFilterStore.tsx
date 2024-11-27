// store/useFilterStore.ts
import { create } from 'zustand';

type SortOption = 'featured' | 'lastTrade' | 'creationTime' | 'lastReply' | 'marketCap';

interface FilterStore {
  showAnimation: boolean;
  showNSFW: boolean;
  selectedSort: SortOption;
  toggleAnimation: () => void;
  toggleNSFW: () => void;
  setSort: (sort: SortOption) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  showAnimation: false,
  showNSFW: false,
  selectedSort: 'featured',

  toggleAnimation: () => set((state) => ({ 
    showAnimation: !state.showAnimation
  })),

  toggleNSFW: () => set((state) => ({ 
    showNSFW: !state.showNSFW
  })),

  setSort: (sort) => set({ selectedSort: sort })
}));