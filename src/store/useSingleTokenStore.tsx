import { create } from 'zustand';
import { TokenType } from '@/type/tokenType';

interface SingleTokenState {
  token: TokenType | null;
  isLoading: boolean;
  error: any | null;
  fetchTokenData: (tokenId: string) => void;
  setToken: (token: TokenType | null) => void;
}

const useSingleTokenStore = create<SingleTokenState>((set) => ({
  token: null,
  isLoading: false,
  error: null,

  fetchTokenData: async (tokenId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/tokens/${tokenId}`);
      const tokenData: TokenType = await response.json();
      set({ token: tokenData, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  setToken: (token) => set({ token }),
}));

export { useSingleTokenStore };