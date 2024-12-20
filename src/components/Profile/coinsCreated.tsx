import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { getTimeAgo } from "@/utils/calculeTime";
import Link from "next/link";
import { UserToken } from "@/type/user";
import { formatNumber } from "@/utils/formatNumber";
import { formatEther } from "viem";

interface CoinsCreatedProps {
  coins: UserToken[];
  username: string; 
  isLoading: boolean;
}

export const CoinsCreated = ({
  coins,
  isLoading,
  username,
}: CoinsCreatedProps) => {
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
  return (
<div className="pt-10 grid grid-cols-1 gap-4 ">
  {coins.map((token, index) => (
    <Link href={`/coin/${token.address}`} key={`${token.symbol}-${index}`}>
      <div className="flex md:gap-3 gap-1">
        <div className="flex-shrink-0">
          {token.image && (
            <Image
              src={token.image}
              alt={`Token ${token.name}`}
              width={200}
              height={200}
            />
          )}
        </div>

        <div className="flex flex-col w-full space-y-1 justify-start overflow-hidden">
          <div className="flex items-center lg:gap-4 gap-1">
            <p className="text-xs font-normal">Created by</p>
            <p className="text-xs font-normal">
              {username || "Unknown"}
            </p>
            <p className="text-xs">{getTimeAgo(token.created_at)}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-xs font-normal text-[#79FF62]">
              Supply:{" "}
              {token.supply
                ? formatNumber(
                    parseFloat(formatEther(BigInt(token.supply)))
                  )
                : "0"}
            </p>
          </div>

          <p className="text-white font-normal text-sm text-start">
            <strong>
              {token.name.toLocaleUpperCase()} ({token.symbol})
            </strong>
          </p>
          <p className="text-xs text-gray-300 break-words  text-start overflow-hidden">
            "{token.description}"
          </p>
        </div>
      </div>
    </Link>
  ))}
</div>
  );
};
