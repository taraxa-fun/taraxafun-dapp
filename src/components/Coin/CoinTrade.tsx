import { useEffect, useState } from "react";
import { Pagination } from "../Shared/pagination";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/router";

import { TokenType } from "@/type/tokenType";
import { tokenData } from "@/data/tokenData";
import { useTradesStore } from "@/store/Coin/useTradesStore";

export const CoinTrades = () => {
  const router = useRouter();
  const { id: coinId } = router.query;

  const token: TokenType | undefined = tokenData.find(
    (t) => t.id.toString() === String(coinId)
  );

  if (!token) {
    return <div className="text-red-500">Token not found</div>;
  }

  const {
    setTrades,
    getCurrentPageTrades,
    trades,
    currentPage,
    totalPages,
    isLoading,
    goToNextPage,
    goToPreviousPage,
  } = useTradesStore();

  useEffect(() => {
    if (token.trades) {
      setTrades(token.trades);
    }
  }, [token.trades, setTrades]);

  if (isLoading) {
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

  if (trades.length === 0) {
    return <div className="mt-8 text-center text-white">No trades yet</div>;
  }

  const currentTrades = getCurrentPageTrades();

  return (
    <>
      <div className="mt-8">
        <div className="bg-[#2D0060] p-4 rounded-lg overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left text-white">
            <thead>
              <tr className="bg-[#1A0033]">
                <th className="py-2 px-4">account</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">ETH</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {currentTrades.map((trade, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#330066]" : "bg-[#2D0060]"
                  }`}
                >
                  <td className="py-2 px-4">{trade.username}</td>
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
                  <td className="py-2 px-4">{trade.amount}</td>
                  <td className="py-2 px-4">{trade.date}</td>
                  <td className="py-2 px-4">{trade.transactionNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
      />
    </>
  );
};
