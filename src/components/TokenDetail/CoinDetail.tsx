import Image from "next/image";
import boltLogo from "../../assets/logo/bolt.png";
import emprorLogo from "../../assets/logo/emprorLogo.png";
import { Skeleton } from "../ui/skeleton";
import { useSingleTokenStore } from "@/store/SingleToken/useSingleTokenStore";
import { Progress } from "../ui/progress";
import Twitterlogo from "../../assets/logo/xLogo.png";
import Telegramlogo from "../../assets/logo/telegramLogo.png";
import WebsiteLogo from "../../assets/logo/websiteLogo.png";
import { usePool } from "@/hooks/usePool";
import { formatUnits } from "viem";
import { useEffect, useState } from "react";
import { useHoldersForToken } from "@/hooks/useHoldersForToken";
import { useWebSocketStore } from "@/store/WS/useWebSocketStore";
import { formatDate } from "@/utils/formatDate";

export const TokenDetails = () => {
  const { tokenData, singleTokenisLoading, fetchTokenData } =
    useSingleTokenStore();
  const [update, setUpdate] = useState<number>(0);
  const { poolData, isLoading, error } = usePool(
    tokenData?.address as `0x${string}`
  );
  const { latestTrade } = useWebSocketStore();
  const { holders } = useHoldersForToken(
    tokenData?.address as `0x${string}`,
    update
  );
  const [percentageBondingCurve, setPercentageBondingCurve] =
    useState<string>("");

  useEffect(() => {
    if (tokenData && tokenData.address) {
      setUpdate(update + 1);
    }
  }, [latestTrade]);

  useEffect(() => {
    const calculateProgress = () => {
      try {
        if (tokenData?.listed === true) {
          setPercentageBondingCurve("100");
          return 100;
        }
        if (!poolData?.pool?.listThreshold || !tokenData?.marketcap) {
          setPercentageBondingCurve("0");
          return 0;
        }

        const threshold = Number(poolData.pool.listThreshold);
        const currentMarketCap = Number(
          formatUnits(BigInt(tokenData.marketcap), 6)
        );
        console.log(currentMarketCap, "currentmarket cap");
        const percentage = (currentMarketCap / threshold) * 100;
        const percentageFinal = Math.min(Math.max(percentage, 0), 100);
        setPercentageBondingCurve(percentageFinal.toFixed(2));
        return percentageFinal;
      } catch (error) {
        setPercentageBondingCurve("0");
        return 0;
      }
    };

    calculateProgress();
  }, [poolData?.pool?.listThreshold, tokenData?.marketcap]);
  useEffect(() => {
    if (
      percentageBondingCurve &&
      Number(percentageBondingCurve) >= 100 &&
      tokenData?.address
    ) {
      fetchTokenData(tokenData.address);
    }
  }, [tokenData]);

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

  useEffect(() => {
    if (
      percentageBondingCurve &&
      Number(percentageBondingCurve) >= 100 &&
      tokenData?.address
    ) {
      fetchTokenData(tokenData.address);
    }
  }, [tokenData]);

  return (
    <div className="flex flex-col gap-4 mx-auto w-full mt-4">
      <div className="flex md:gap-3 gap-1">
        <div className="flex-shrink-0">
          <Image src={tokenData.image} alt="" width={200} height={200} />
        </div>
        <div className="flex flex-col w-full space-y-1 justify-start overflow-hidden">
          <p className="text-white font-normal text-sm">
            <strong>
              {tokenData.name.toLocaleUpperCase()} ({tokenData.symbol})
            </strong>
          </p>
          <p className="text-xs text-gray-300 break-words overflow-hidden">
            "{tokenData.description}"
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {tokenData.website && (
          <a
            href={tokenData.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 underline"
          >
            <Image
              src={WebsiteLogo}
              alt="wesbite logo"
              width={20}
              height={20}
            />
            <p className="text-md text-white font-medium">
              {tokenData.website}
            </p>
          </a>
        )}
        {tokenData.twitter && (
          <a
            href={tokenData.twitter}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 underline"
          >
            <Image src={Twitterlogo} alt="x Logo" width={20} height={20} />
            <p className="text-md text-white font-medium">
              {tokenData.twitter}
            </p>
          </a>
        )}
        {tokenData.telegram && (
          <a
            href={tokenData.telegram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 underline"
          >
            <Image
              src={Telegramlogo}
              alt="telegram logo"
              width={20}
              height={20}
            />
            <p className="text-md text-white font-medium">
              {tokenData.telegram}
            </p>
          </a>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <p className="font-medium text-base">
            Bonding curve progress:{" "}
            {percentageBondingCurve ? percentageBondingCurve : "0"}%
          </p>
          <p className="font-medium text-base">type: linear</p>
        </div>

        <Progress
          value={Number(percentageBondingCurve)}
          fillColor="bg-[#79FF62]"
          backgroundColor="bg-[#458343]"
        />

        {tokenData.listed ? (
          <>
            <div className="flex items-center gap-2">
              <Image src={boltLogo} alt="placeholder" width={24} height={24} />
              <p className="text-xs text-[#A9A8AD] font-medium">
                taraswap pool seeded ! view on taraswap{" "}
                <a
                  href=""
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9A62FF] hover:underline"
                >
                  here
                </a>
              </p>
            </div>
          </>
        ) : (
          <p className="text-xs text-[#A9A8AD] font-medium ">
            graduate this coin to raydium at $35,000 market cap. there is ?? SOL
            in the bonding curve.
          </p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-medium text-base">
          Pump emperor progress{" "}
          {Math.min(Number(percentageBondingCurve) * 2, 100)}%
        </p>
        <Progress
          value={Math.min(Number(percentageBondingCurve) * 2, 100)}
          fillColor="bg-[#FFE862]"
          backgroundColor="bg-[#887843]"
        />

        {tokenData && tokenData.pump_emperor && tokenData.listed && (
          <div className="flex items-center gap-2">
            <Image src={emprorLogo} alt="empror logo" width={24} height={24} />
            <p className="text-xs text-[#A9A8AD] font-medium ">
              Nominated Pump Emperor on the {formatDate(tokenData.pump_emperor)}
            </p>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col">
        <h3 className="font-bold mb-4 text-2xl">Holder Distribution</h3>
        {holders.length === 0 ? (
          <p>No holders found.</p>
        ) : (
          holders.map((holder, index) => {
            const percentage =
              (parseFloat(holder.value) /
                parseFloat(holder.token.total_supply)) *
              100;

            return (
              <div
                key={index}
                className="w-full flex justify-between space-y-1"
              >
                <p className="text-md font-normal">
                  {index + 1}.{" "}
                  <a
                    href={`https://etherscan.io/address/${holder.address.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9A62FF] hover:underline"
                  >
                    {holder.address.hash.slice(0, 5)}
                  </a>
                </p>
                <p className="text-md font-normal">{percentage.toFixed(2)}%</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
