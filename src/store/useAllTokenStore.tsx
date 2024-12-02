// store/useTokenStore.ts
import { create } from 'zustand';
import { TokenType } from '@/type/tokenType';
import { tokenData } from '@/data/tokenData';

interface TokenStore {
  allTokens: TokenType[];
  filteredTokens: TokenType[] | null;
  currentPage: number;
  tokensPerPage: number;
  searchQuery: string;
  isLoading: boolean;
  hasSearched: boolean;
  
  setSearchQuery: (query: string) => void;
  searchTokens: (query: string) => Promise<void>;
  clearSearch: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setCurrentPage: (page: number) => void;
  getCurrentTokens: () => TokenType[];
  getTotalPages: () => number;
}

export const useTokenStore = create<TokenStore>((set, get) => ({
  allTokens: tokenData,
  filteredTokens: null,
  currentPage: 1,
  tokensPerPage: 10,
  searchQuery: '',
  isLoading: false,
  hasSearched: false,

  getCurrentTokens: () => {
    const state = get();
    const tokensToDisplay = state.filteredTokens ?? state.allTokens;
    const indexOfLastToken = state.currentPage * state.tokensPerPage;
    const indexOfFirstToken = indexOfLastToken - state.tokensPerPage;
    return tokensToDisplay.slice(indexOfFirstToken, indexOfLastToken);
  },

  getTotalPages: () => {
    const state = get();
    const tokensToDisplay = state.filteredTokens ?? state.allTokens;
    return Math.ceil(tokensToDisplay.length / state.tokensPerPage);
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  searchTokens: async (query: string) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const searchResults = tokenData.filter(token => 
        token.name.toLowerCase().includes(query.toLowerCase()) ||
        token.symbol.toLowerCase().includes(query.toLowerCase())
      );
      set({ 
        filteredTokens: searchResults,
        hasSearched: true,
        isLoading: false,
        currentPage: 1
      });
    } catch (error) {
      console.error('Error searching tokens:', error);
      set({ filteredTokens: [], isLoading: false });
    }
  },

  clearSearch: () => set({ 
    searchQuery: '',
    filteredTokens: null,
    hasSearched: false,
    currentPage: 1
  }),

  goToNextPage: () => {
    const state = get();
    if (state.currentPage < state.getTotalPages()) {
      set({ currentPage: state.currentPage + 1 });
    }
  },

  goToPreviousPage: () => {
    const state = get();
    if (state.currentPage > 1) {
      set({ currentPage: state.currentPage - 1 });
    }
  },

  setCurrentPage: (page: number) => set({ currentPage: page })
}));