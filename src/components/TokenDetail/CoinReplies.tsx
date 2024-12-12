import { Skeleton } from "../ui/skeleton";
import { useRepliesTokenIdStore } from "@/store/SingleToken/useRepliesTokenIdStore";
import Link from "next/link";
import { getTimeAgo } from "@/utils/calculeTime";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

export const CoinReplies = () => {
  const { replies, repliesIsLoading } = useRepliesTokenIdStore();

  if (repliesIsLoading) {
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
  if (!replies || replies.length === 0) {
    return (
      <div className="mt-8 bg-[#2D0060] p-8 rounded-lg text-center">
        <p className="text-gray-400">No replies yet. Be the first to reply!</p>
      </div>
    );
  }
  console.log(replies);
  return (
    <div className="mt-8 space-y-4">
      {replies.map((reply, index) => (
        <div key={reply._id} className="bg-[#2D0060] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Link
                href={`/profile/${reply.user.username}`}
                className="bg-[#FFE862] px-2 py-1 rounded flex items-center gap-2"
              >
                {reply && reply.user.avatar && (
                  <Image
                    src={reply.user.avatar}
                    width={20}
                    height={20}
                    alt="User Avatar"
                    className="rounded-full"
                  />
                )}
                <span className="text-black text-sm">
                  @{reply.user.username ? reply.user.username : ""}
                </span>
              </Link>

              <span className="text-xs text-gray-300">
                {formatDate(reply.created_at)}
              </span>
              <span className="text-xs text-gray-300">#{index + 1}</span>
            </div>
          </div>
          <p className="text-sm text-gray-200">{reply.content}</p>
        </div>
      ))}
    </div>
  );
};
