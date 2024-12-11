import { useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/components/Navbar/navbar";
import { NextPage } from "next";
import { CoinChart } from "@/components/TokenDetail/CoinChart";
import { CoinReplies } from "@/components/TokenDetail/CoinReplies";
import { useState } from "react";
import { CoinTrades } from "@/components/TokenDetail/CoinTrade";
import Link from "next/link";
import { CoinHeader } from "@/components/TokenDetail/CoinHeader";
import { CardTransaction } from "@/components/TokenDetail/CardTransaction";
import { TokenDetails } from "@/components/TokenDetail/CoinDetail";
import { CreateReply } from "@/components/CreateReply/createReply";
import { useSingleTokenStore } from "@/store/SingleToken/useSingleTokenStore";
import { useRepliesTokenIdStore } from "@/store/SingleToken/useRepliesTokenIdStore";

const CoinPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<"thread" | "trades">("thread");
  const { fetchTokenData, singleTokenisLoading, tokenData, error } = useSingleTokenStore();
  const { fetchReplies } = useRepliesTokenIdStore();
  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    if (address) {
      fetchTokenData(address as string);
      fetchReplies(address as string);
    }
  }, [address]);

  if (singleTokenisLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="mb-4 pt-32 px-4">
        <Link href="/">(go back)</Link>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-8 px-4 pb-20">
        <CoinHeader />

        {/* Chart Section */}
        <div className="col-span-12 lg:col-span-8 space-y-8 order-1 lg:order-1">
          <CoinChart />
        </div>

        {/* Transaction Section */}
        <div className="col-span-12 lg:col-span-4 order-2 lg:order-1 flex flex-col space-y-4">
          <CardTransaction />
        </div>

        {/* Thread and Trades */}
        <div className="col-span-12 lg:col-span-8 space-y-8 order-4 lg:order-2">
          <div className="flex justify-between items-center gap-4">
            {/* Navigation Tabs */}
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
                    ? "bg-[#5600AA] text-white"
                    : " text-[#A9A8AD]"
                }`}
                onClick={() => setActiveTab("trades")}
              >
                trades
              </button>
            </div>

            {/* CreateReply Component */}
            <div>
              <CreateReply />
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "thread" && <CoinReplies />}
          {activeTab === "trades" && <CoinTrades />}
        </div>

        {/* Token Details */}
        <div className="col-span-12 lg:col-span-4 order-3 lg:order-3">
          <TokenDetails />
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
