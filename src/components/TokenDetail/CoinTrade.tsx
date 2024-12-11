import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/router";

import { useSingleTokenStore } from "@/store/SingleToken/useSingleTokenStore";
import { useWebSocketStore } from "@/store/WS/useWebSocketStore";
import { formatDate } from "@/utils/formatDate";
import { formatEther } from "viem";

export const CoinTrades = () => {
  const router = useRouter();
  const { tokenData, singleTokenisLoading } = useSingleTokenStore();
  const { latestTrades } = useWebSocketStore();
  const [displayedTrades, setDisplayedTrades] = useState(
    tokenData?.trades || []
  );

  // Combine les trades WebSocket avec ceux existants
  useEffect(() => {
    if (latestTrades && tokenData?.address) {
      const newTrades = latestTrades.filter(
        (trade) => trade.token.address === tokenData.address
      );
      if (newTrades.length > 0) {
        setDisplayedTrades((prevTrades) => {
          const combinedTrades = [...newTrades, ...prevTrades];
          return combinedTrades.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
        });
      }
    }
  }, [latestTrades, tokenData?.address]);

  // Trier les trades existants au premier rendu
  useEffect(() => {
    if (tokenData?.trades) {
      setDisplayedTrades(
        [...tokenData.trades].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    }
  }, [tokenData?.trades]);

  if (singleTokenisLoading) {
    return (
      <div className="mt-8 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#2D0060] p-4 rounded-lg">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
          </div>
        ))}
      </div>
    );
  }

  if (displayedTrades.length === 0) {
    return <div className="mt-8 text-center text-white">No trades yet</div>;
  }

  return (
    <>
      <div className="mt-8">
        <div className="bg-[#2D0060] p-4 rounded-lg overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left text-white">
            <thead>
              <tr className="bg-[#1A0033]">
                <th className="py-2 px-4">Account</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">ETH</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {displayedTrades.map((trade, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#330066]" : "bg-[#2D0060]"
                  }`}
                >
                  <td className="py-2 px-4"></td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-block py-1 px-2 rounded ${
                        trade.type === "buy"
                          ? "text-[#79FF62] "
                          : "text-[#FF5656] "
                      }`}
                    >
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {trade.type === "buy"
                      ? trade.outAmount
                        ? Number(formatEther(BigInt(trade.outAmount))).toFixed(
                            4
                          )
                        : ""
                      : trade.inAmount
                      ? Number(formatEther(BigInt(trade.inAmount))).toFixed(6)
                      : ""}
                  </td>

                  <td className="py-2 px-4">{formatDate(trade.created_at)}</td>
                  <td className="py-2 px-4"> {trade.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
