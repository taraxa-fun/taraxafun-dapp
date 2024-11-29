// components/Profile/CoinsCreated.tsx
import { useEffect } from "react";
import Image from "next/image";
import placeHodlerRounded from "../../assets/placeholderRounded.png";
import { TokenType } from "@/type/tokenType";
import { useCoinsCreatedStore } from "@/store/useCoinsCreatedStore";
import { Pagination } from "../Shared/pagination";
import { Skeleton } from "../ui/skeleton";
import { getTimeAgo } from "@/utils/calculeTime";

interface CoinsCreatedProps {
  coins: TokenType[];
}

export const CoinsCreated = ({ coins }: CoinsCreatedProps) => {
  const {
    setCoins,
    getCurrentPageCoins,
    currentPage,
    getTotalPages,
    goToNextPage,
    goToPreviousPage,
    isLoading,
  } = useCoinsCreatedStore();

  useEffect(() => {
    setCoins(coins);
  }, [coins, setCoins]);

  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="h-40 w-full mb-4" />
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (coins.length === 0) {
    return <div className="mt-8 text-center text-white">No coins created</div>;
  }

  const currentCoins = getCurrentPageCoins();

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 ">
        {currentCoins.map((token: TokenType, index: number) => (
          <div
            key={`${token.symbol}-${index}`}
            className="flex md:gap-3 gap-1 mx-auto lg:px-4 px-1 w-full"
          >
            <div className="flex-shrink-0">
              <Image
                src={token.imagePath}
                alt={`Token ${token.name}`}
                width={200}
                height={200}
              />
            </div>

            <div className="flex flex-col space-y-1 justify-center">
              <div className="flex items-center lg:gap-4 gap-1">
                <p className="text-xs font-normal">created by</p>
                <div className="flex items-center gap-1">
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
                <p className="text-xs font-normal">replies: {token.replies}</p>
              </div>

              <p className="text-gray-300 font-normal text-xs">
                {token.symbol}: {token.description}
              </p>
            </div>
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
