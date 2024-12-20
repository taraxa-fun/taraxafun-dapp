
import { useRouter } from "next/router";
import { useState } from "react";
import { handleCopy } from "@/utils/copy";
import { BuySection } from "./Transaction/buySection";
import { SellSection } from "./Transaction/sellSection";

export const CardTransaction = () => {
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    "buy" | "sell"
  >("buy");
  const [copied, isCopied] = useState(false);
  const router = useRouter();
  const { address: tokenAddress } = router.query;
  const handleTypeSelect = (type: "buy" | "sell") => {
    setSelectedTransactionType(type);
  };
  return (
    <div>
      <div className="bg-[#2D0060] lg:p-8 p-4 w-full rounded-lg">
        <div className="flex items-center justify-between gap-2 mb-4">
          <button
            className={`flex-1 px-4 py-2 rounded-md ${
              selectedTransactionType === "buy"
                ? "bg-[#9A62FF] text-white"
                : "bg-[#9A62FF] text-white opacity-50"
            }`}
            onClick={() => handleTypeSelect("buy")}
          >
            Buy
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-md ${
              selectedTransactionType === "sell"
                ? "bg-[#9A62FF] text-white"
                : "bg-[#9A62FF] text-white opacity-50"
            }`}
            onClick={() => handleTypeSelect("sell")}
          >
            Sell
          </button>
        </div>
        {selectedTransactionType === "buy" ? <BuySection /> : <SellSection />}
      </div>
      <div className="flex flex-col gap-2 mx-auto">
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-normal">CA:</p>
          <div className="flex flex-col items-center w-full">
            {tokenAddress && (
              <div className="text-sm w-full">
                <span className="text-sm font-normal text-start border rounded border-gray-300 text-gray-300 p-2.5 bg-transparent block w-full">
                  {tokenAddress}
                </span>
                <div className="flex justify-between mt-2 w-full">
                  <a
                    href={`https://basescan.org/address/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9A62FF] cursor-pointer"
                  >
                    view on basescan
                  </a>
                  <button
                    className="hover:text-[#9A62FF] cursor-pointer"
                    onClick={() => handleCopy(tokenAddress as string, isCopied)}
                  >
                    {copied ? "copied" : "copy address"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};