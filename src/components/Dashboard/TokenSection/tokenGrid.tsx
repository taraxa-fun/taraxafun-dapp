import Image from "next/image";
import { useTokenStore } from "@/store/useTokenStore";
import { getTimeAgo } from "@/utils/calculeTime";
import { Skeleton } from "@/components/ui/skeleton";
import placeHodlerRounded from "../../../assets/placeholderNavRounded.png";
import { TokenType } from "@/type/tokenType";
import Link from "next/link";


export const TokenGrid = () => {
  const { getCurrentTokens, isLoading, filteredTokens, hasSearched } =
    useTokenStore();

  const currentTokens = getCurrentTokens();

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

  if (hasSearched && filteredTokens?.length === 0) {
    return (
      <div className="px-4 text-center text-gray-400 py-8">
        No tokens found for your search
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 px-4">
      {currentTokens.map((token: TokenType, index: number) => (
        <Link href={`/coin/${token.id}`}>
        <div key={`${token.symbol}-${index}`} className="flex flex-col">
          <div className="mb-4 w-[200px] h-[200px] relative overflow-hidden flex items-center justify-center">
            <Image
              src={token.imagePath}
              alt={`Token ${token.creator}`}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col space-y-1 justify-center">
            <div className="flex items-center gap-4">
              <p className="text-xs font-normal">created by</p>
              <div className="flex items-center gap-2">
                <Image
                  src={placeHodlerRounded}
                  alt="creator avatar"
                  width={20}
                  height={20}
                />
                <p className="text-xs font-normal">{token.creator}</p>
              </div>
              <p className="text-xs">{getTimeAgo(token.timestamp)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-xs font-normal text-[#79FF62]">
                market cap: {token.marketCap}
              </p>
              <p className="text-xs font-normal">replies: {token.replyCount}</p>
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
