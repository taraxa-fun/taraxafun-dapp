import Image from "next/image";
import { useState, useEffect } from "react";
import taraxafunlogo from "../../assets/logo/taraxafunLogo.png";
import xLogo from "../../assets/logo/xLogo.png";
import telegramLogo from "../../assets/logo/telegramLogo.png";
import instagramLogo from "../../assets/logo/instagramLogo.png";
import tiktokLogo from "../../assets/logo/tiktokLogo.png";
import placeholderNav from "../../assets/placeholderNav.png";
import placeholderNavRounded from "../../assets/placeholderNavRounded.png";
import { CustomBtnApp } from "../connect-btn";
import { HowItWorksModal } from "../HowItWorks/modalHowItWorks";
import Link from "next/link";
import { useWebSocketStore } from "@/store/WS/useWebSocketStore";
import { formatEther } from "viem";
import { useLastTrades } from "@/hooks/useLastTrade";
import { useTokenStore } from "@/store/useAllTokenStore";
import { Skeleton } from "../ui/skeleton";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { latestTrade, latestTokens } = useWebSocketStore();
  const { trades } = useLastTrades();
  const { tokens, fetchTokens, isLoading } = useTokenStore();
  const [isTradesLoading, setIsTradesLoading] = useState(true);
  const [isTokensLoading, setIsTokensLoading] = useState(true);
  const [displayedTrade, setDisplayedTrade] = useState<any>(null);
  const [isTradeShaking, setIsTradeShaking] = useState(false);
  const [displayedToken, setDisplayedToken] = useState<any>(null);
  const [isTokenShaking, setIsTokenShaking] = useState(false);

  useEffect(() => {
    if (tokens.length === 0) {
      fetchTokens();
    }
  }, []);

  // Réagir directement au latestTrade
  useEffect(() => {
    if (latestTrade) {
      setDisplayedTrade(latestTrade);
      setIsTradeShaking(true);
      setTimeout(() => setIsTradeShaking(false), 200);
      setIsTradesLoading(false);
    } else if (trades.length > 0) {
      setDisplayedTrade(trades[0]);
      setIsTradesLoading(false);
    } else {
      setIsTradesLoading(true);
    }
  }, [latestTrade, trades]);

  // Réagir directement au latestTokens
  useEffect(() => {
    if (latestTokens && latestTokens.symbol) {
      setDisplayedToken(latestTokens);
      setIsTokenShaking(true);
      setTimeout(() => setIsTokenShaking(false), 200);
      setIsTokensLoading(false);
    } else if (tokens.length > 0) {
      setDisplayedToken(tokens[0]);
      setIsTokensLoading(false);
    } else {
      setIsTokensLoading(true);
    }
  }, [latestTokens, tokens]);
  return (
    <>
      <nav className="absolute w-full lg:w-12/12 lg:mx-auto z-40 lg:top-2 top-0 px-4 backdrop-blur-[10px] rounded-none lg:rounded-full">
        <div className="grid grid-cols-12 items-center mx-auto py-2">
          {/* Left Section */}
          <div className="col-span-3 flex items-center gap-4">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={taraxafunlogo}
                alt="Taraxafun Logo"
                width={40}
                height={40}
              />
            </Link>
            <div className="flex flex-col lg:flex-row items-start md:items-center lg:items-center gap-2">
              <div className="flex flex-col lg:flex-row gap-2">
                <HowItWorksModal />
                <p className="text-sm font-semibold">(support)</p>
              </div>
              <div className="flex items-center gap-1">
                <Image src={xLogo} alt="X Logo" width={18} height={18} />
                <Image
                  src={telegramLogo}
                  alt="Telegram Logo"
                  width={18}
                  height={18}
                />
                <Image
                  src={instagramLogo}
                  alt="Instagram Logo"
                  width={18}
                  height={18}
                />
                <Image
                  src={tiktokLogo}
                  alt="Tiktok Logo"
                  width={18}
                  height={18}
                />
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="sm:col-span-6 flex justify-center items-center space-x-4">
            <ul className="flex gap-4">
              {/* Latest Trade */}
              <li
                className={`hidden md:block lg:block ${
                  isTradeShaking ? "shake-animation" : ""
                }`}
              >
                {isTradesLoading || !displayedTrade ? (
                  <Skeleton className="h-10 w-64 rounded" />
                ) : (
                  <a
                    href={`https://etherscan.io/tx/${
                      displayedTrade.hash || "#"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-2 rounded bg-[#79FF62] text-black font-normal text-sm"
                  >
                    {displayedTrade.user?.avatar && (
                      <Image
                        src={displayedTrade.user.avatar}
                        alt="User Avatar"
                        width={20}
                        height={20}
                      />
                    )}
                    {displayedTrade.type === "buy" ? (
                      <span>
                        {displayedTrade.user.username} bought{" "}
                        {Number(
                          formatEther(BigInt(displayedTrade.inAmount))
                        ).toFixed(4)}{" "}
                        TARA of ${displayedTrade.token.symbol}
                      </span>
                    ) : (
                      <span>
                        {displayedTrade.user.username} sold{" "}
                        {Number(
                          formatEther(BigInt(displayedTrade.outAmount))
                        ).toFixed(4)}{" "}
                        TARA of ${displayedTrade.token.symbol}
                      </span>
                    )}
                    {displayedTrade.token.image && (
                      <Image
                        src={displayedTrade.token.image}
                        alt="token image"
                        width={20}
                        height={20}
                      />
                    )}
                  </a>
                )}
              </li>

              {/* Latest Token */}
              <li
                className={`hidden md:block lg:block ${
                  isTokenShaking ? "shake-animation" : ""
                }`}
              >
                {isTokensLoading || !displayedToken ? (
                  <Skeleton className="h-10 w-64 rounded" />
                ) : (
                  <a
                    href=""
                    target="_blank"
                    className="flex items-center gap-2 px-2 py-2 rounded bg-[#FFE862] text-black font-normal text-sm"
                  >
                    {displayedToken.user.avatar && (
                      <Image
                        src={displayedToken.user.avatar}
                        width={20}
                        height={20}
                        alt="Placeholder Nav"
                      />
                    )}
                    <span>
                      {displayedToken.user?.username} created $
                      {displayedToken.symbol}
                    </span>
                    {displayedToken.image && (
                      <Image
                        src={displayedToken.image}
                        alt="User Avatar"
                        width={20}
                        height={20}
                      />
                    )}
                  </a>
                )}
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="col-span-8 sm:col-span-3 flex justify-end">
            <CustomBtnApp className="text-sm font-semibold" />
          </div>
        </div>
      </nav>
    </>
  );
};
