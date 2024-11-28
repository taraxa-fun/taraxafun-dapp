// components/Shared/Pagination.tsx
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasFiltered?: boolean;
    filteredLength?: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
  }
  
  export const Pagination = ({
    currentPage,
    totalPages,
    hasFiltered = false,
    filteredLength = 1,
    onNextPage,
    onPreviousPage
  }: PaginationProps) => {
    if (hasFiltered && filteredLength === 0) {
      return null;
    }
  
    return (
      <div className="flex items-center justify-center gap-2 mt-8 pb-8">
        <button
          onClick={onPreviousPage}
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
          onClick={onNextPage}
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