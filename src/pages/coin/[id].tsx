import { Navbar } from "@/components/Navbar/navbar";
import { NextPage } from "next";
import { HeaderCoin } from "@/components/Coin/headerCoin";
import { CoinChart } from "@/components/Coin/CoinChart";
import { CoinReplies } from "@/components/Coin/CoinReplies";
import { useState } from "react";
import { CoinTrades } from "@/components/Coin/CoinTrade";
import Link from "next/link";

const CoinPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<"thread" | "trades">("thread");

  return (
    <div className="min-h-screen px-4">
      <Navbar />
      <div className="mb-4 pt-32">
        <Link href="/">(go back)</Link>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <CoinChart />
          <div className="flex gap-4">
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "thread"
                  ? "bg-[#5600AA] text-white"
                  : " text-[#A9A8AD]"
              }`}
              onClick={() => setActiveTab("thread")}
            >
              thread
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "trades"
                  ? "bg-[#9A62FF] text-white"
                  : " text-[#A9A8AD]"
              }`}
              onClick={() => setActiveTab("trades")}
            >
              trades
            </button>
          </div>

          {activeTab === "thread" && <CoinReplies />}
          {activeTab === "trades" && <CoinTrades />}
        </div>
        <div className="col-span-12 lg:col-span-4">
          <h2>SPAN 4</h2>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
