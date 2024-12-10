import Image from "next/image";
import placeHodlerRounded from "../../assets/placeholderRounded.png";
import { Skeleton } from "../ui/skeleton";
import { getTimeAgo } from "@/utils/calculeTime";
import Link from "next/link";
import { useSingleTokenStore } from "@/store/SingleToken/useSingleTokenStore";

export const CoinHeader = () => {
  const { tokenData, singleTokenisLoading } = useSingleTokenStore();
  console.log(tokenData);
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
            href={`/profile/${tokenData.creator.username}`}
            className="text-xs font-normal"
          >
            {tokenData.creator.username}
          </Link>
          <p className="text-sm">{getTimeAgo(tokenData.created_at)}</p>
          <p className="text-[#79FF62] text-xs font-normal">
            market cap: {tokenData.marketcap}
          </p>
          <p className="text-xs font-normal">
            replies: {tokenData.commentsStats.count}
          </p>
        </div>
      </div>
    </div>
  );
};
