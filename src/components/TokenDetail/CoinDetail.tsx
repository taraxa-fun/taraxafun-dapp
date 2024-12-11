import Image from "next/image";
import placeHodlerRounded from "../../assets/placeholderRounded.png";
import { Skeleton } from "../ui/skeleton";
import { getTimeAgo } from "@/utils/calculeTime";
import { useSingleTokenStore } from "@/store/SingleToken/useSingleTokenStore";
import { Progress } from "../ui/progress";

export const TokenDetails = () => {
  const { tokenData, singleTokenisLoading } = useSingleTokenStore();

  if (singleTokenisLoading || !tokenData) {
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
            src={tokenData.image}
            alt=""
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col w-full space-y-1 justify-start">
          <p className="text-white font-normal text-sm">
          <strong>{tokenData.name.toLocaleUpperCase()} ({tokenData.symbol})</strong>
          </p>
          <p className="text-xs text-gray-300">"{tokenData.description}"</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <p className="font-medium text-base">
            Bonding curve progress: ??%
          </p>
          <p className="font-medium text-base">type: linear</p>
        </div>

        <Progress
          value={50}
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
          Pump emperor progress  %
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
