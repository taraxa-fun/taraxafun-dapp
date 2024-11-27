import { useTokenStore } from "@/store/useTokenStore";

export const ToekenPagination = () => {
    const { 
      currentPage, 
      getTotalPages, 
      goToNextPage, 
      goToPreviousPage,
      filteredTokens,
      hasSearched 
    } = useTokenStore();
  
    const totalPages = getTotalPages();
  
    if (hasSearched && filteredTokens?.length === 0) {
      return null;
    }
  
    return (
      <div className="flex items-center justify-center gap-2 mt-8 pb-8">
        <button
          onClick={goToPreviousPage}
          className={`${
            currentPage === 1
              ? "text-gray-500"
              : "text-white hover:text-[#79FF62]"
          }`}
          disabled={currentPage === 1}
        >
          ( ← )
        </button>
        <span className="text-white">{currentPage}</span>
        <button
          onClick={goToNextPage}
          className={`${
            currentPage === totalPages
              ? "text-gray-500"
              : "text-white hover:text-[#79FF62]"
          }`}
          disabled={currentPage === totalPages}
        >
          ( → )
        </button>
      </div>
    );
  };