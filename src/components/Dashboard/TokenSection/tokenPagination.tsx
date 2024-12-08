// components/Shared/Pagination.tsx
import { useTokenStore } from "@/store/useAllTokenStore";

export const TokenPagination = () => {
  const { 
    currentPage, 
    totalPages, 
    goToNextPage, 
    goToPreviousPage,
    tokens 
  } = useTokenStore();

  if (tokens.length === 0) {
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
      <span className="text-white">{currentPage} / {totalPages}</span>
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