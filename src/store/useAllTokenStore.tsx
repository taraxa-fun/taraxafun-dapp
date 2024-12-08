import { servUrl } from "@/config/servUrl";
import { TokenType } from "@/type/tokenType";
import axios from "axios";
import { create } from "zustand";

interface TokenStore {
  tokens: TokenType[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  sortBy: "marketcap" | "last-comment" | "last-trade" | "created-at";
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;

  fetchTokens: (params?: {
    page?: number;
    sortBy?: "marketcap" | "last-comment" | "last-trade" | "created-at";
    search?: string;
  }) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: "marketcap" | "last-comment" | "last-trade" | "created-at") => void;
  clearFilters: () => void;
  goToNextPage: () => Promise<void>;
  goToPreviousPage: () => Promise<void>;
}

export const useTokenStore = create<TokenStore>((set, get) => ({
  tokens: [],
  currentPage: 1,
  totalPages: 1,
  searchQuery: "",
  sortBy: "created-at",
  isLoading: false,
  error: null,
  hasSearched: false,

  fetchTokens: async (params) => {
    const state = get();
    set({ isLoading: true });

    try {
      const queryParams = new URLSearchParams({
        sortby: params?.sortBy || state.sortBy,
        page: String(params?.page || state.currentPage),
        limit: "10",
      });

      if (params?.search || state.searchQuery) {
        queryParams.append("search", params?.search || state.searchQuery);
      }

      const response = await axios.get(
        `${servUrl}/token/all?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      set({
        tokens: response.data.data.tokens,
        currentPage: response.data.data.pagination.currentPage,
        totalPages: response.data.data.pagination.totalPages,
        sortBy: params?.sortBy || state.sortBy,
        isLoading: false,
        error: null,
        hasSearched: !!(params?.search || state.searchQuery),
      });
    } catch (error) {
      console.error("Error fetching tokens:", error);
      set({
        isLoading: false,
        error: "Failed to fetch tokens",
      });
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setSortBy: (sortBy: "marketcap" | "last-comment" | "last-trade" | "created-at") => {
    set({ sortBy });
    get().fetchTokens({ sortBy, page: 1 });
  },

  clearFilters: () => {
    set({
      searchQuery: "",
      sortBy: "created-at",
      currentPage: 1,
      hasSearched: false,
    });
    get().fetchTokens({ page: 1, sortBy: "created-at" });
  },

  goToNextPage: async () => {
    const state = get();
    if (state.currentPage < state.totalPages) {
      const nextPage = state.currentPage + 1;
      await get().fetchTokens({
        page: nextPage,
        sortBy: state.sortBy,
        search: state.searchQuery,
      });
    }
  },

  goToPreviousPage: async () => {
    const state = get();
    if (state.currentPage > 1) {
      const prevPage = state.currentPage - 1;
      await get().fetchTokens({
        page: prevPage,
        sortBy: state.sortBy,
        search: state.searchQuery,
      });
    }
  },
}));
