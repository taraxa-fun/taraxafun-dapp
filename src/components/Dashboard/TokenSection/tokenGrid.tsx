import Image from "next/image";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/store/useAllTokenStore";
import { getTimeAgo } from "@/utils/calculeTime";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenType } from "@/type/tokenType";
import Link from "next/link";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useWebSocketStore } from "@/store/WS/useWebSocketStore";

export const TokenGrid = () => {
  const { tokens, isLoading, fetchTokens, currentPage } = useTokenStore();
  const { sortBy } = useTokenStore();
  const { latestTrades, latestTokens, hasNewToken } = useWebSocketStore();
  const { showAnimation } = useAnimationStore();
  const [displayedTokens, setDisplayedTokens] = useState<any[]>([]);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    setDisplayedTokens(tokens);
  }, [tokens]);

  useEffect(() => {
    if (
      sortBy === "last-trade" &&
      latestTrades.length > 0 &&
      showAnimation &&
      currentPage === 1
    ) {
      const lastTrade = latestTrades[0];

      // Trouve le token existant
      const existingToken = tokens.find(
        (token) =>
          token.address.toLowerCase() === lastTrade.token.address.toLowerCase()
      );

      const mappedTrade = {
        _id: lastTrade.token._id,
        name: lastTrade.token.symbol,
        symbol: lastTrade.token.symbol,
        image: lastTrade.token.image,
        description: lastTrade.token.description,
        twitter: "",
        telegram: "",
        website: "",
        supply: "",
        address: lastTrade.token.address.toLowerCase(),
        // Utilise le created_at existant ou celui du lastTrade si le token n'existe pas encore
        created_at: existingToken
          ? existingToken.created_at
          : lastTrade.created_at,
        marketcap: lastTrade.token.marketcap,
        replies_count: lastTrade.token.replies_count,
        user: {
          username: lastTrade.user.username,
          wallet: lastTrade.user.wallet,
          avatar: lastTrade.user.avatar,
          _id: lastTrade.user._id,
        },
      };

      const filteredTokens = tokens.filter(
        (token) => token.address.toLowerCase() !== mappedTrade.address
      );

      const updatedTokens = [mappedTrade, ...filteredTokens];

      setDisplayedTokens(updatedTokens);

      console.log("Updated Tokens:", updatedTokens);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
    }
  }, [tokens, latestTrades, sortBy, showAnimation, currentPage]);

  useEffect(() => {
    if (
      sortBy === "created-at" &&
      hasNewToken &&
      currentPage === 1 &&
      showAnimation
    ) {
      setTimeout(() => {
        fetchTokens();
        setDisplayedTokens(tokens);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 200);
        console.log(tokens);
      }, 10000);
    }
  }, [hasNewToken, sortBy, currentPage]);
  if (isLoading) {
    return (
      <div className="px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="px-4 text-center text-gray-400 py-8">
        No tokens found for your search
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 px-4">
      {displayedTokens.map((token: TokenType, index: number) => (
        <Link
          href={`/coin/${token.address ? token.address : ""}`}
          key={`${index}`}
        >
          <div
            className={`flex flex-col hover:shadow-lg transition-all h-[354px] ${
              index === 0 && isShaking ? "shake-animation bg-[#FFE862]" : ""
            }`}
          >
            <div className="mb-4 w-full flex items-center justify-center">
              {token.image && (
                <Image
                  src={token.image}
                  alt={`Token image`}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              )}
            </div>

            <div className="flex flex-col space-y-1 justify-center">
              <div className="flex items-center gap-4">
                <p className="text-xs font-normal">created by</p>
                <Link
                  href={`/profile/${
                    token.user.username ? token.user.username : ""
                  }`}
                  className="text-xs font-normal hover:underline"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-normal">
                      {token.user.username ? token.user.username : ""}
                    </p>
                  </div>
                </Link>
                <p className="text-xs">
                  {getTimeAgo(token.created_at ? token.created_at : "")}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-xs font-normal text-[#79FF62]">
                  market cap: ${token.marketcap ? token.marketcap : "0"}
                </p>
                <p className="text-xs font-normal">
                  replies: {token.replies_count ? token.replies_count : "0"}
                </p>
              </div>

              <p className="text-gray-300 font-normal text-xs line-clamp-3">
                <span className="text-white font-bold">
                  {token.name ? token.name : ""} (
                  {token.symbol ? token.symbol : ""}):
                </span>{" "}
                {token.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
