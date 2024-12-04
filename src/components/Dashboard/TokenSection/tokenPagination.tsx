import { Pagination } from "@/components/Shared/pagination";
import { useTokenStore } from "@/store/useAllTokenStore";

export const TokenPagination = () => {
  const { 
    currentPage, 
    getTotalPages, 
    goToNextPage, 
    goToPreviousPage,
    filteredTokens,
    hasSearched 
  } = useTokenStore();

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={getTotalPages()}
      hasFiltered={hasSearched}
      filteredLength={filteredTokens?.length}
      onNextPage={goToNextPage}
      onPreviousPage={goToPreviousPage}
    />
  );
};