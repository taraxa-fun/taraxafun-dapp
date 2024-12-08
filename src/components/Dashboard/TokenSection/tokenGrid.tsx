import Image from "next/image";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/store/useAllTokenStore";
import { getTimeAgo } from "@/utils/calculeTime";
import { Skeleton } from "@/components/ui/skeleton";
import placeHodlerRounded from "../../../assets/placeholderNavRounded.png";
import { TokenType } from "@/type/tokenType";
import Link from "next/link";
import placeHolderTokenImg from "../../../assets/placeHodlerPumpEmperor.png";

export const TokenGrid = () => {
  const { tokens, isLoading, fetchTokens, searchQuery } = useTokenStore();

  useEffect(() => {
    fetchTokens();
  }, []);

  if (isLoading) {
    return (
      <div className="px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (searchQuery && tokens.length === 0) {
    return (
      <div className="px-4 text-center text-gray-400 py-8">
        No tokens found for your search
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 px-4">
      {tokens.map((token: TokenType, index: number) => (
        <Link href={`/coin/${token.address}`} key={`${index}`}>
          <div className="flex flex-col hover:shadow-lg transition-all">
            <div className="mb-4 w-[200px] h-[200px] flex items-center justify-center">
              <Image
                src={placeHolderTokenImg.src}
                alt={`Token ${token.creator}`}
                width={200}
                height={200}
                className="object-contain" 
              />
            </div>

            <div className="flex flex-col space-y-1 justify-center">
              <div className="flex items-center gap-4">
                <p className="text-xs font-normal">created by</p>
                <Link
                  href={`/profile/${token.creator.username}`}
                  className="text-xs font-normal hover:underline"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={placeHodlerRounded}
                      alt="creator avatar"
                      width={20}
                      height={20}
                    />
                    <p className="text-xs font-normal">
                      {token.creator.username}
                    </p>
                  </div>
                </Link>
                <p className="text-xs">{getTimeAgo(token.created_at)}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-xs font-normal text-[#79FF62]">
                  market cap: {token.marketcap}
                </p>
                <p className="text-xs font-normal">
                  replies: {token.commentsStats.count}
                </p>
              </div>

              <p className="text-gray-300 font-normal text-xs">
                <span className="text-white font-bold">
                  {token.name} ({token.symbol}):
                </span>{" "}
                {token.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
