// components/Profile/CoinsHeld.tsx
import { useEffect } from "react";
import Image from "next/image";
import placeHodlerRounded from "../../assets/placeholderRounded.png";
import { CoinHeld } from "@/type/coinHeld";
import { useCoinsHeldStore } from "@/store/useCoinsHeldStore";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface CoinsHeldProps {
  coins: CoinHeld[];
}

export const CoinsHeld = ({ coins }: CoinsHeldProps) => {
  const {
    setCoins,
    getCurrentPageCoins,
    currentPage,
    getTotalPages,
    goToNextPage,
    goToPreviousPage,
    isLoading,
  } = useCoinsHeldStore();

  useEffect(() => {
    setCoins(coins);
  }, [coins, setCoins]);

  if (isLoading) {
    return (
      <div className="mt-8 space-y-4 ">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex flex-col items-start gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (coins.length === 0) {
    return <div className="mt-8 text-center text-white">No coins held</div>;
  }

  const currentCoins = getCurrentPageCoins();

  return (
    <>
      <div className="mt-8 space-y-4 w-full max-w-lg px-4">
        {currentCoins.map((coin, index) => (
          <div key={index} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Image src={placeHodlerRounded} alt="placeholder" />
              <div className="flex flex-col items-start">
                <p className="font-normal text-md">
                  {coin.amount} {coin.symbol}
                </p>
                <p className="font-normal text-[#79FF62] text-md">5M $TARA</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-normal text-md">(refresh)</p>
              <Link href={`/coin/${coin.id}`} key={`${coin.symbol}-${index}`}> 
                <p className="font-normal text-md">(view coin)</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
        {/** 
      <Pagination
        currentPage={currentPage}
        totalPages={getTotalPages()}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
      />
      */}
    </>
  );
};
