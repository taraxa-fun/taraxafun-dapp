import Image from "next/image";
import placeHodlerRounded from "../../assets/placeholderRounded.png";
import { TokenType } from "@/type/tokenType";
import { tokenData } from "@/data/tokenData";
import { useRouter } from "next/router";
import { Skeleton } from "../ui/skeleton";
import { getTimeAgo } from "@/utils/calculeTime";
import Link from "next/link";

export const CoinHeader = () => {
  const router = useRouter();
  const { address: tokenAddress } = router.query;
  const token: TokenType | undefined = tokenData.find(
    (t) => t.address.toString() === tokenAddress
  );

  if (!token) {
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
      <p className="">{token.name} ({token.symbol})</p>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-xs font-normal">created by</p>
          <Image
            src={placeHodlerRounded}
            alt="placholder"
            width={12}
            height={12}
          />
          <Link href={`/profile/${token.creator}`} className="text-xs font-normal">
            {token.creator}
          </Link>
          <p className="text-sm">{getTimeAgo(token.timestamp)}</p>
          <p className="text-[#79FF62] text-xs font-normal">
            market cap: {token.marketCap}
          </p>
          <p className="text-xs font-normal">replies : {token.replyCount}</p>
        </div>
      </div>
    </div>
  );
};
