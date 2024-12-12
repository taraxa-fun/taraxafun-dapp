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

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { latestTrades, latestTokens } = useWebSocketStore();
  const { trades } = useLastTrades();
  const { tokens, fetchTokens, isLoading } = useTokenStore();

  const [currentTradeIndex, setCurrentTradeIndex] = useState(0);
  const [displayedTrade, setDisplayedTrade] = useState<any>(null);
  const [isTradeShaking, setIsTradeShaking] = useState(false);

  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
  const [displayedToken, setDisplayedToken] = useState<any>(null);
  const [isTokenShaking, setIsTokenShaking] = useState(false);

  useEffect(() => {
    if (tokens.length === 0) {
      fetchTokens();
    }
  }, []);

  // Handle trades
  useEffect(() => {
    const tradesToDisplay =
      latestTrades && latestTrades.length > 0 ? latestTrades : trades;

    if (tradesToDisplay.length > 0) {
      const tradeInterval = setInterval(() => {
        setCurrentTradeIndex(
          (prevIndex) => (prevIndex + 1) % tradesToDisplay.length
        );
      }, 2000);

      return () => clearInterval(tradeInterval);
    }
  }, [latestTrades, trades]);

  useEffect(() => {
    const tradesToDisplay =
      latestTrades && latestTrades.length > 0 ? latestTrades : trades;

    if (tradesToDisplay.length > 0) {
      setDisplayedTrade(tradesToDisplay[currentTradeIndex]);
      setIsTradeShaking(true);
      setTimeout(() => setIsTradeShaking(false), 200);
    }
  }, [currentTradeIndex]);

  // Handle tokens
  useEffect(() => {
    const tokensToDisplay =
      latestTokens && latestTokens.symbol ? [latestTokens] : tokens.slice(0, 5);

    if (tokensToDisplay.length > 0) {
      const tokenInterval = setInterval(() => {
        setCurrentTokenIndex(
          (prevIndex) => (prevIndex + 1) % tokensToDisplay.length
        );
      }, 2000);

      return () => clearInterval(tokenInterval);
    }
  }, [latestTokens, tokens]);
  useEffect(() => {
    const tokensToDisplay =
      latestTokens && latestTokens.symbol ? [latestTokens] : tokens.slice(0, 5);

    if (tokensToDisplay.length > 0) {
      setDisplayedToken(tokensToDisplay[currentTokenIndex]);
      setIsTokenShaking(true);
      setTimeout(() => setIsTokenShaking(false), 200);
    }
  }, [currentTokenIndex]);

  const handleClickOutside = (event: any) => {
    if (
      event.target.closest("#navbar-sticky") ||
      event.target.closest("#burger-menu-button")
    ) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
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
                <a
                  href={`https://etherscan.io/tx/${
                    displayedTrade?.hash || "#"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2 py-2 rounded bg-[#79FF62] text-black font-normal text-sm"
                >
                  {displayedTrade && displayedTrade.user?.avatar && (
                    <Image
                      src={displayedTrade.user?.avatar}
                      alt="User Avatar"
                      width={20}
                      height={20}
                    />
                  )}
                  {displayedTrade ? (
                    displayedTrade.type === "buy" ? (
                      <span>
                        {displayedTrade.user.username} bought{" "}
                        {Number(
                          formatEther(BigInt(displayedTrade.outAmount))
                        ).toFixed(4)}{" "}
                        TARA of ${displayedTrade.token.symbol}
                      </span>
                    ) : (
                      <>
                        <span>
                          {displayedTrade.user.username} sold{" "}
                          {Number(
                            formatEther(BigInt(displayedTrade.outAmount))
                          ).toFixed(4)}{" "}
                          ${displayedTrade.token.symbol}
                        </span>
                      </>
                    )
                  ) : (
                    <span>No trades to display</span>
                  )}
                  {displayedTrade && displayedTrade.token.image && (
                    <Image
                      src={displayedTrade.token?.image}
                      alt="User Avatar"
                      width={20}
                      height={20}
                    />
                  )}
                </a>
              </li>

              {/* Latest Token */}
              <li
                className={`hidden md:block lg:block ${
                  isTokenShaking ? "shake-animation" : ""
                }`}
              >
                <a
                  href=""
                  target="_blank"
                  className="flex items-center gap-2 px-2 py-2 rounded bg-[#FFE862] text-black font-normal text-sm"
                >
                  {displayedToken && displayedToken.user.avatar && (
                    <Image
                      src={displayedToken.user.avatar}
                      width={20}
                      height={20}
                      alt="Placeholder Nav"
                    />
                  )}

                  {displayedToken ? (
                    <span>
                      {displayedToken.user?.username} created $
                      {displayedToken.symbol}
                    </span>
                  ) : (
                    <span>No tokens to display</span>
                  )}
                  {displayedToken && displayedToken.image && (
                    <Image
                      src={displayedToken.image}
                      alt="User Avatar"
                      width={20}
                      height={20}
                    />
                  )}
                </a>
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
