import { useEffect } from "react";
import Image from "next/image";

import { useRepliesStore } from "@/store/useRepliesStore";
import { Pagination } from "../Shared/pagination";
import { Skeleton } from "../ui/skeleton";
import { Reply } from "@/type/reply";

interface RepliesProps {
  replies: Reply[];
}

export const Replies = ({ replies }: RepliesProps) => {
  const {
    setReplies,
    getCurrentPageReplies,
    currentPage,
    getTotalPages,
    goToNextPage,
    goToPreviousPage,
    isLoading,
  } = useRepliesStore();

  useEffect(() => {
    setReplies(replies);
  }, [replies, setReplies]);

  if (isLoading) {
    return (
      <div className="mt-8 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#2D0060] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-[100px] w-[100px] mb-4" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (replies.length === 0) {
    return <div className="mt-8 text-center text-white">No replies yet</div>;
  }

  const currentReplies = getCurrentPageReplies();

  return (
    <>
      <div className="mt-8 space-y-4 lg:px-4 px-1">
        {currentReplies.map((reply) => (
          <div key={reply.id} className="bg-[#2D0060] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <span className="bg-[#FFE862] px-2 py-1 rounded text-black text-sm">
                  @{reply.username}
                </span>
                <span className="text-xs text-gray-300">
                  {reply.date} | {reply.time} | #{reply.id}
                </span>
              </div>
              {reply.coinId && (
                <button className="text-xs hover:text-[#9A62FF]">
                  (view coin)
                </button>
              )}
            </div>

            {reply.imagePath && (
              <div className="mb-4 max-w-[100px] max-h-[100px] relative overflow-hidden rounded-lg">
                <Image
                  src={reply.imagePath}
                  alt="Reply image"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <p className="text-sm text-gray-200">{reply.text}</p>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={getTotalPages()}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
      />
    </>
  );
};
