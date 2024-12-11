import { useEffect } from "react";
import Image from "next/image";

import { Skeleton } from "../ui/skeleton";
import { Reply } from "@/type/reply";
import { UserComment } from "@/type/user";
import { getTimeAgo } from "@/utils/calculeTime";
import Link from "next/link";

interface RepliesProps {
  replies: UserComment[];
  username: string;
}

export const Replies = ({ replies, username }: RepliesProps) => {
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="mt-8 space-y-4 w-full">
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

  return (
    <>
      <div className="mt-8 space-y-4 lg:px-4 px-1  w-full">
        {replies.map((reply) => (
          <div key={reply._id} className="bg-[#2D0060] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <span className="bg-[#FFE862] px-2 py-1 rounded text-black text-sm">
                  @{username}
                </span>
                <span className="text-xs text-gray-300">
                  {getTimeAgo(reply.created_at)}
                </span>
              </div>

              {reply.token_address && (
                <Link href={`/coin/${reply.token_address}`} className="text-xs hover:text-[#9A62FF]">
                  (view coin)
                </Link>
              )}
     
            </div>
            {/** 
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
              */}

            <p className="text-sm text-start text-gray-200">{reply.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};
