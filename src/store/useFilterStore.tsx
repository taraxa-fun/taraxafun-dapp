import { SortOption } from '@/type/sortOption';
import { SortOrder } from '@/type/sortOrder';
import { create } from 'zustand';




interface FilterStore {
  showAnimation: boolean;
  showNSFW: boolean;
  selectedSort: SortOption;
  sortOrder: SortOrder;
  toggleAnimation: () => void;
  toggleNSFW: () => void;
  setSort: (sort: SortOption, order?: SortOrder) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  showAnimation: false,
  showNSFW: false,
  selectedSort: 'featured',
  sortOrder: 'desc',

  toggleAnimation: () => set((state) => ({ 
    showAnimation: !state.showAnimation
  })),

  toggleNSFW: () => set((state) => ({ 
    showNSFW: !state.showNSFW
  })),

  setSort: (sort, order = 'desc') => set({ selectedSort: sort, sortOrder: order }),
}));