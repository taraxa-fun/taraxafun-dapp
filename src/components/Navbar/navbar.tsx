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
import { useAnimationStore } from "@/store/useAnimationStore";
import { formatEther } from "viem";
import { useLastTrades } from "@/hooks/useLastTrade";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { latestTrades } = useWebSocketStore();
  const { trades } = useLastTrades();
  const [currentTradeIndex, setCurrentTradeIndex] = useState(0);
  const [displayedTrade, setDisplayedTrade] = useState<any>(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!latestTrades && !trades) return;

    const tradesToDisplay =
      latestTrades && latestTrades.length > 0 ? latestTrades : trades;

    const interval = setInterval(() => {
      if (tradesToDisplay.length > 0) {
        setCurrentTradeIndex(
          (prevIndex) => (prevIndex + 1) % tradesToDisplay.length
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [latestTrades, trades]);

  useEffect(() => {
    if (!latestTrades && !trades) return;

    const tradesToDisplay =
      latestTrades && latestTrades.length > 0 ? latestTrades : trades;

    if (tradesToDisplay.length > 0) {
      setDisplayedTrade(tradesToDisplay[currentTradeIndex]);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200); 
    }
  }, [currentTradeIndex]);

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

  const { showAnimation } = useAnimationStore();

  useEffect(() => {
    console.log(latestTrades);
  }, [latestTrades]);
  return (
    <>
      {/* Desktop Navbar */}
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

          <div className="sm:col-span-6 flex justify-center items-center space-x-4">
            <ul className="flex gap-4">
            <li
        className={`hidden md:block lg:block ${
          isShaking ? "shake-animation" : ""
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
                      <span>
                        {displayedTrade.user.username} sold{" "}
                        {Number(
                          formatEther(BigInt(displayedTrade.outAmount))
                        ).toFixed(4)}{" "}
                        ${displayedTrade.token.symbol}
                      </span>
                    )
                  ) : (
                    <span>No trades to display</span>
                  )}
                </a>
              </li>

              <li
                className={`hidden md:block lg:block ${
                  showAnimation ? "shake-animation " : ""
                }`}
              >
                <a
                  href=""
                  target="_blank"
                  className="flex items-center gap-2 px-2 py-2 rounded bg-[#FFE862] text-black font-normal text-sm"
                >
                  <Image src={placeholderNav} alt="Placeholder Nav" />
                  <span>1Ly231 created $TARA</span>
                  <Image src={placeholderNavRounded} alt="Placeholder Nav" />
                </a>
              </li>
            </ul>
          </div>

          {/* Right section */}
          <div className="col-span-8 sm:col-span-3 flex justify-end">
            <CustomBtnApp className="text-sm font-semibold" />
          </div>
        </div>
      </nav>
    </>
  );
};
