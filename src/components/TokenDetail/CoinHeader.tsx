import Image from "next/image";
import placeHodlerRounded from "../../assets/placeholderRounded.png";
import { Skeleton } from "../ui/skeleton";
import { getTimeAgo } from "@/utils/calculeTime";
import Link from "next/link";
import { useSingleTokenStore } from "@/store/SingleToken/useSingleTokenStore";
import { useWebSocketStore } from "@/store/WS/useWebSocketStore";
import { useEffect, useState } from "react";

export const CoinHeader = () => {
  const { tokenData, singleTokenisLoading } = useSingleTokenStore();
  const { latestTrades } = useWebSocketStore();
  const [marketCap, setMarketCap] = useState<string | null>(null);


  useEffect(() => {
    if (latestTrades && tokenData?.address) {
      const matchingTrade = latestTrades.find(
        (trade) => trade.token.address === tokenData.address
      );

      if (matchingTrade) {
        setMarketCap(matchingTrade.token.marketcap);
      }
    }
  }, [latestTrades, tokenData?.address]);
  if (!tokenData || singleTokenisLoading) {
    return (
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <Skeleton className="h-6 w-full" />
        <div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 lg:col-span-8 space-y-8">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">
          {tokenData.name} ({tokenData.symbol})
        </p>
        <div className="flex items-center gap-2">
          <p className="text-xs font-normal">created by</p>
          <Image
            src={placeHodlerRounded}
            alt="placeholder"
            width={12}
            height={12}
          />
          <Link
            href={`/profile/${tokenData.user.username}`}
            className="text-xs font-normal"
          >
            {tokenData.user.username}
          </Link>
          <p className="text-sm">{getTimeAgo(tokenData.created_at)}</p>
          <p className="text-[#79FF62] text-xs font-normal">
            market cap: ${marketCap ? marketCap : tokenData.marketcap}
          </p>

          <p className="text-xs font-normal">
            replies: {tokenData.commentsStats.count}
          </p>
        </div>
      </div>
    </div>
  );
};
