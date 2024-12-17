import Image from "next/image";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/store/useAllTokenStore";
import { getTimeAgo } from "@/utils/calculeTime";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenType } from "@/type/tokenType";
import Link from "next/link";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useWebSocketStore } from "@/store/WS/useWebSocketStore";
import { formatNumber } from "@/utils/formatNumber";
import { formatMarketCap } from "@/utils/formatMarketCap";
import { useRepliesTokenIdStore } from "@/store/SingleToken/useRepliesTokenIdStore";
import { useCommentWebSocketStore } from "@/store/WS/useWebSocketRepliesStore";

export const TokenGrid = () => {
  const { tokens, isLoading, fetchTokens, currentPage } = useTokenStore();
  const { sortBy } = useTokenStore();
  const { latestTrades, latestTokens, hasNewToken } = useWebSocketStore();
  const {initCommentWebSocket, cleanupCommentWebSocket, latestComments} = useCommentWebSocketStore()
  const { showAnimation } = useAnimationStore();
  const [displayedTokens, setDisplayedTokens] = useState<any[]>([]);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    if (sortBy === "last-comment" && showAnimation && currentPage === 1) {
      initCommentWebSocket();
    } else {
      cleanupCommentWebSocket();
    }
    return () => {
      cleanupCommentWebSocket();
    };
  }, [sortBy, showAnimation, currentPage]);


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
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
    } else if (
      sortBy === "last-comment" &&
      latestComments &&
      latestComments.length > 0 &&
      showAnimation &&
      currentPage === 1
    ) {
      const lastReply = latestComments[0];
  
      const existingToken = tokens.find(
        (token) => token.address.toLowerCase() === lastReply.address.toLowerCase()
      );
  
      const mappedReply = {
        _id: lastReply._id,
        name: lastReply.name,
        symbol: lastReply.symbol,
        image: lastReply.image,
        description: lastReply.description,
        twitter: lastReply.twitter,
        telegram: lastReply.telegram,
        website: lastReply.website,
        supply: lastReply.supply,
        address: lastReply.address.toLowerCase(),
        created_at: existingToken ? existingToken.created_at : lastReply.created_at,
        marketcap: lastReply.marketcap,
        user: {
          username: lastReply.user.username,
          wallet: lastReply.user.wallet,
        },
      };
  
      const filteredTokens = tokens.filter(
        (token) => token.address.toLowerCase() !== mappedReply.address
      );
  
      const updatedTokens = [mappedReply, ...filteredTokens];

      setDisplayedTokens(updatedTokens);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
    }
  }, [tokens, latestTrades, latestComments, sortBy, showAnimation, currentPage]);

  useEffect(() => {
    console.log("CONDITION CREATED AT APPELÉ")
    if (
      sortBy === "created-at" &&
      hasNewToken &&
      currentPage === 1 &&
      showAnimation
    ) {
      setTimeout(() => {
        console.log("SET TIME OUT APPELÉ");
        fetchTokens();
        setDisplayedTokens(tokens);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 200);
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
                  market cap: $
                  {token.marketcap ? formatMarketCap(token.marketcap) : "0"}
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
