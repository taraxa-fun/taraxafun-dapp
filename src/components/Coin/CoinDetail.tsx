import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import placeHodlerRounded from "../../assets/placeholderRounded.png";
import { TokenType } from "@/type/tokenType";
import { tokenData } from "@/data/tokenData";
import { Skeleton } from "../ui/skeleton";
import { getTimeAgo } from "@/utils/calculeTime";
import { useSingleTokenStore } from "@/store/useSingleTokenStore";
import { Progress } from "../ui/progress";

export const TokenDetails = () => {
  const router = useRouter();
  const { address: tokenAddress } = router.query;
  const { setToken, token, isLoading } = useSingleTokenStore();

  useEffect(() => {
    if (tokenAddress) {
      const foundToken = tokenData.find((t) => t.address.toString() === tokenAddress);
      setToken(foundToken || null);
    }
  }, [tokenAddress, setToken]);

  if (isLoading || !token) {
    return (
      <div className="flex flex-col mt-4">
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
    );
  }

  return (
    <div className="flex flex-col gap-4 mx-auto w-full mt-4">
      <div className="flex md:gap-3 gap-1">
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

              <p className="text-xs">{getTimeAgo(token.timestamp)}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-xs font-normal text-[#79FF62]">
              market cap: {token.marketCap}
            </p>
            <p className="text-xs font-normal">replies: {token.replyCount}</p>
          </div>
          <p className="text-gray-300 font-normal text-xs">
            {token.symbol}: {token.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <p className="font-medium text-base">
            Bonding curve progress: {token.bondingCurve}%
          </p>
          <p className="font-medium text-base">type: linear</p>
        </div>

        <Progress
          value={token.bondingCurve}
          fillColor="bg-[#79FF62]"
          backgroundColor="bg-[#458343]"
        />
        <p className="text-xs text-[#A9A8AD] font-medium ">
          graduate this coin to raydium at $98,325 market cap there
          is 34,631 SOL in the bonding curve
        </p>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-medium text-base">
          Pump emperor progress {token.bondingCurve}%
        </p>

        <Progress
          value={80}
          fillColor="bg-[#FFE862]"
          backgroundColor="bg-[#887843]"
        />
        <p className="text-xs text-[#A9A8AD] font-medium ">
          dethrone the current king at $47,794 market cap
        </p>
      </div>
      <div className="mt-5 flex flex-col">
        <h3 className="font-bold mb-4 text-2xl">holder distribution</h3>
        <div className="w-full flex justify-between space-y-1">
          <p className="text-xs font-normal">
            1. 0x19308akklazkealezm 🏦 (bonding curve)
          </p>
          <p className="text-xs font-normal">48.12%</p>
        </div>
        <div className="w-full flex justify-between space-y-1">
          <p className="text-xs font-normal">
            1. 0x19308akklazkealezm 🏦 (bonding curve)
          </p>
          <p className="text-xs font-normal">48.12%</p>
        </div>
        <div className="w-full flex justify-between space-y-1">
          <p className="text-xs font-normal">
            1. 0x19308akklazkealezm 🏦 (bonding curve)
          </p>
          <p className="text-xs font-normal">48.12%</p>
        </div>
        <div className="w-full flex justify-between space-y-1">
          <p className="text-xs font-normal">
            1. 0x19308akklazkealezm 🏦 (bonding curve)
          </p>
          <p className="text-xs font-normal">48.12%</p>
        </div>
      </div>
    </div>
  );
};
