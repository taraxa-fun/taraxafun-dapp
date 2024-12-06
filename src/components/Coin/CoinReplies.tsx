import { useEffect } from "react";
import Image from "next/image";
import { Pagination } from "../Shared/pagination";
import { Skeleton } from "../ui/skeleton";
import { useRepliesStoreCoinId } from "@/store/Coin/useRepliesCoinId";
import Link from "next/link";
import { useRouter } from "next/router";
import { TokenType } from "@/type/tokenType";
import { tokenData } from "@/data/tokenData";

export const CoinReplies = () => {
  const router = useRouter();
  const { address: tokenAddress } = router.query;

  const token: TokenType | undefined = tokenData.find(
    (t) => t.address.toString() === tokenAddress
  );

  if (!token) {
    return <div className="text-red-500">Token not found</div>;
  }

  const {
    setReplies,
    getCurrentPageReplies,
    currentPage,
    totalPages,
    isLoading,
    goToNextPage,
    goToPreviousPage,
  } = useRepliesStoreCoinId();

  useEffect(() => {
    if (token.replies) {
      setReplies(token.replies);
    }
  }, [token.replies, setReplies]);

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
  if (!token.replies || token.replies.length === 0) {
    return <div className="mt-8 text-center text-white">No replies yet</div>;
  }

  const currentReplies = getCurrentPageReplies();

  return (
    <>
      <div className="mt-8 space-y-4 ">
        {currentReplies.map((reply) => (
          <div key={reply.id} className="bg-[#2D0060] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <Link href={`/profile/${reply.username}`}>
                  <span className="bg-[#FFE862] px-2 py-1 rounded text-black text-sm">
                    @{reply.username}
                  </span>
                </Link>
                <span className="text-xs text-gray-300">
                  {reply.date} | {reply.time} | #{reply.id}
                </span>
              </div>
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
        totalPages={totalPages}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
      />
    </>
  );
};
