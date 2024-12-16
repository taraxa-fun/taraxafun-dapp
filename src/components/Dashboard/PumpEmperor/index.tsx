import Image from "next/image";
import placeHodlerPumpEmpror from "../../../assets/placeHodlerPumpEmperor.png";
import placeHodlerRounded from "../../../assets/placeholderNavRounded.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TokenType } from "@/type/tokenType";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { getTimeAgo } from "@/utils/calculeTime";
import { getPumpEmperor } from "@/utils/getPumpEmperor";

export const PumpEmperor = () => {
  const [pumpEmperor, setPumpEmperor] = useState<TokenType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPumpEmperor();
        setPumpEmperor(data);
      } catch (error) {
        console.error("Error fetching pump emperor:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const isEmpty = !pumpEmperor || Object.keys(pumpEmperor).length === 0;
  return (
    <section className="pt-24 lg:w-6/12 w-12/12 md:w-8/12 flex flex-col items-center justify-center mx-auto">
      <h2 className="knewave text-[40px] text-center mb-8 bg-gradient-to-b from-[#D6C8FF] to-[#8100FB] text-transparent bg-clip-text title-shadow">
        Pump Emperor
      </h2>
      {isLoading || isEmpty ? (
        <div className="flex gap-1 mx-auto px-4 md:px-4 max-w-md w-full overflow-hidden">
          <Skeleton className="h-[110px] w-[110px] flex-shrink-0" />
          <div className="flex flex-col space-y-1 justify-center min-w-0 w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <Skeleton className="h-4 w-16" /> {/* "created by" */}
              <div className="flex items-center gap-1">
                <Skeleton className="h-5 w-5 rounded-full" /> {/* avatar */}
                <Skeleton className="h-4 w-20" /> {/* username */}
              </div>
              <Skeleton className="h-4 w-10" /> {/* timestamp */}
            </div>
            <div className="flex justify-between gap-2">
              <Skeleton className="h-4 w-24" /> {/* first stat */}
              <Skeleton className="h-4 w-24" /> {/* second stat */}
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" /> {/* title */}
              <Skeleton className="h-12 w-full" /> {/* description */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:gap-3 gap-1 mx-auto lg:px-4 px-1">
          <div className="flex-shrink-0">
            {pumpEmperor && pumpEmperor?.image && (
              <Image
                src={pumpEmperor?.image}
                alt="Pump Emperor"
                width={160}
                height={160}
              />
            )}
          </div>
          <div className="flex flex-col space-y-1 justify-center">
            <div className="flex items-center gap-4">
              <p className="text-xs font-normal">created by</p>
              <div className="flex items-center gap-2">
                {pumpEmperor?.user?.avatar && (
                  <Image
                    src={pumpEmperor.user.avatar}
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                )}

                <Link
                  href={`/profile/${pumpEmperor?.user.username}`}
                  className="text-xs font-normal"
                >
                  {pumpEmperor?.user.username ? pumpEmperor?.user.username : ""}
                </Link>
              </div>
              <p className="text-xs">
                {pumpEmperor?.created_at != null
                  ? getTimeAgo(pumpEmperor.created_at)
                  : ""}
                {getTimeAgo(pumpEmperor?.created_at || "")}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-normal text-[#79FF62]">
                market cap: ${pumpEmperor?.marketcap || "0"}
              </p>
              <p className="text-xs font-normal">
                replies: {pumpEmperor?.replies_count || 0}
              </p>
            </div>
            <p className="text-gray-300 font-normal text-xs">
              <span className="text-white font-bold">
                {pumpEmperor?.name} ({pumpEmperor?.symbol}):
              </span>{" "}
              {pumpEmperor?.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
