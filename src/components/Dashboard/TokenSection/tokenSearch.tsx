import { useTokenStore } from '@/store/useAllTokenStore';

export const TokenSearch = () => {
  const {
    searchQuery,
    isLoading,
    hasSearched,
    setSearchQuery,
    fetchTokens,
    clearFilters,
  } = useTokenStore();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchTokens({ search: searchQuery, page: 1 });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSearch();
    }
  };

  const handleClear = () => {
    clearFilters();
  };

  return (
    <div className="mb-6 w-full max-w-md mx-auto relative pt-10 px-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tokens..."
            className="w-full px-4 py-2 rounded-lg bg-[#9A62FF] text-white placeholder:text-white placeholder:font-normal text-base placeholder:text-base focus:outline-none focus:border-[#79FF62]"
            disabled={isLoading}
          />
          {hasSearched && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
            >
              Clear
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchQuery.trim()}
          className={`px-4 py-2 rounded-lg bg-[#9A62FF] ${
            isLoading || !searchQuery.trim()
              ? "cursor-not-allowed"
              : "hover:bg-[#9A62FF] hover:text-black"
          } text-white`}
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            "Search"
          )}
        </button>
      </div>
    </div>
  );
};
