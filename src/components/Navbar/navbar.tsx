import Image from "next/image";
import { useState, useEffect } from "react";
import taraxafunlogo from "../../assets/logo/taraxafunLogo.png";
import xLogo from "../../assets/logo/xLogo.png";
import telegramLogo from "../../assets/logo/telegramLogo.png";
import { CustomBtnApp } from "../connect-btn";
import { HowItWorksModal } from "../HowItWorks/modalHowItWorks";
import Link from "next/link";
import { useWebSocketStore } from "@/store/WS/useWebSocketStore";
import { formatEther } from "viem";
import { useLastTrades } from "@/hooks/useLastTrade";
import { useTokenStore } from "@/store/useAllTokenStore";
import { Skeleton } from "../ui/skeleton";

export const Navbar = () => {
  const { latestTrade, latestTokens } = useWebSocketStore();
  const { trades } = useLastTrades();
  const { tokens, fetchTokens, isLoading } = useTokenStore();
  const [isTradesLoading, setIsTradesLoading] = useState(true);
  const [isTokensLoading, setIsTokensLoading] = useState(true);
  const [displayedTrade, setDisplayedTrade] = useState<any>(null);
  const [isTradeShaking, setIsTradeShaking] = useState(false);
  const [displayedToken, setDisplayedToken] = useState<any>(null);
  const [isTokenShaking, setIsTokenShaking] = useState(false);
  const [currentTradeIndex, setCurrentTradeIndex] = useState(0);
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
  useEffect(() => {
    if (tokens.length === 0) {
      fetchTokens();
    }
  }, []);

  useEffect(() => {
    if (latestTrade) {
      setDisplayedTrade(latestTrade);
      setIsTradeShaking(true);
      setTimeout(() => setIsTradeShaking(false), 200);
      setIsTradesLoading(false);
    } else if (trades.length > 0) {
      setIsTradesLoading(false);
      const tradesToDisplay = trades.slice(0, 5);

      const tradeInterval = setInterval(() => {
        setCurrentTradeIndex(
          (prevIndex) => (prevIndex + 1) % tradesToDisplay.length
        );
      }, 2000);

      setDisplayedTrade(tradesToDisplay[currentTradeIndex]);
      setIsTradeShaking(true);
      setTimeout(() => setIsTradeShaking(false), 200);

      return () => clearInterval(tradeInterval);
    } else {
      setIsTradesLoading(true);
    }
  }, [latestTrade, trades, currentTradeIndex]);

  useEffect(() => {
    if (latestTokens && latestTokens.symbol) {
      setDisplayedToken(latestTokens);
      setIsTokenShaking(true);
      setTimeout(() => setIsTokenShaking(false), 200);
      setIsTokensLoading(false);
    } else if (tokens.length > 0) {
      setIsTokensLoading(false);
      const tokensToDisplay = tokens.slice(0, 5);

      const tokenInterval = setInterval(() => {
        setCurrentTokenIndex(
          (prevIndex) => (prevIndex + 1) % tokensToDisplay.length
        );
      }, 2000);

      setDisplayedToken(tokensToDisplay[currentTokenIndex]);
      setIsTokenShaking(true);
      setTimeout(() => setIsTokenShaking(false), 200);

      return () => clearInterval(tokenInterval);
    } else {
      setIsTokensLoading(true);
    }
  }, [latestTokens, tokens, currentTokenIndex]);
  return (
    <>
      <nav className="absolute w-full lg:w-12/12 lg:mx-auto z-40 lg:top-2 top-0 px-4 backdrop-blur-[10px] rounded-none lg:rounded-full">
        <div className="grid grid-cols-12 items-center mx-auto py-2">
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
                <a
                  href="https://x.com/taraxadotfun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={xLogo} alt="X Logo" width={18} height={18} />
                </a>
                <Image
                  src={telegramLogo}
                  alt="Telegram Logo"
                  width={18}
                  height={18}
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-6 flex justify-center items-center space-x-4">
            <ul className="flex gap-4">
              <li
                className={`hidden md:block lg:block ${
                  isTradeShaking ? "shake-animation" : ""
                }`}
              >
                {isTradesLoading || !displayedTrade ? (
                  <Skeleton className="h-10 w-64 rounded" />
                ) : (
                  <a
                    href={`https://basescan.org/tx/${
                      displayedTrade.hash || "#"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#79FF62] text-black font-normal text-sm"
                  >
                    {displayedTrade.user?.avatar && (
                      <Image
                        src={displayedTrade.user.avatar}
                        alt="User Avatar"
                        width={20}
                        height={20}
                      />
                    )}
                    {displayedTrade &&
                    displayedTrade.type &&
                    displayedTrade.user &&
                    displayedTrade.token ? (
                      displayedTrade.type === "buy" ? (
                        <span>
                          {displayedTrade.user.username} bought{" "}
                          {displayedTrade.inAmount && (
                            <>
                              {Number(
                                formatEther(BigInt(displayedTrade.inAmount))
                              ).toFixed(4)}{" "}
                              TARA of ${displayedTrade.token.symbol}
                            </>
                          )}
                        </span>
                      ) : (
                        <span>
                          {displayedTrade.user.username} sold{" "}
                          {displayedTrade.outAmount && (
                            <>
                              {Number(
                                formatEther(BigInt(displayedTrade.outAmount))
                              ).toFixed(4)}{" "}
                              TARA of ${displayedTrade.token.symbol}
                            </>
                          )}
                        </span>
                      )
                    ) : null}
                    {displayedTrade &&
                      displayedTrade.token &&
                      displayedTrade.token.image && (
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
                    className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#FFE862] text-black font-normal text-sm"
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

          <div className="col-span-8 sm:col-span-3 flex justify-end">
            <CustomBtnApp className="text-sm font-semibold" />
          </div>
        </div>
      </nav>
    </>
  );
};
