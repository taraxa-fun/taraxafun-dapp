import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getTimeAgo } from "@/utils/calculeTime";
import { getPumpEmperor } from "@/utils/getPumpEmperor";
import { formatMarketCap } from "@/utils/formatMarketCap";
import { EmperorToken } from "@/type/PumpEmpror/PumpEmperorType";

export const PumpEmperor = () => {
  const [pumpEmperor, setPumpEmperor] = useState<EmperorToken | null>(null);
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
        <div className="flex gap-1 mx-auto  md:px-4 max-w-md w-full overflow-hidden">
          <Skeleton className="h-[110px] w-[110px] flex-shrink-0" />
          <div className="flex flex-col space-y-1 justify-center min-w-0 w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <Skeleton className="h-4 w-16" /> 
              <div className="flex items-center gap-1">
                <Skeleton className="h-5 w-5 rounded-full" /> 
                <Skeleton className="h-4 w-20" /> 
              </div>
              <Skeleton className="h-4 w-10" /> 
            </div>
            <div className="flex justify-between gap-2">
              <Skeleton className="h-4 w-24" /> 
              <Skeleton className="h-4 w-24" /> 
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" /> 
              <Skeleton className="h-12 w-full" /> 
            </div>
          </div>
        </div>
      ) : (
        <Link href={`/coin/${pumpEmperor?.token?.address || ""}`}>
        <div className="flex md:gap-3 gap-1 mx-auto lg:px-4 px-1">
          <div className="flex-shrink-0">
            {pumpEmperor?.token?.image && (
              <Image
                src={pumpEmperor.token.image}
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
                {pumpEmperor?.token?.user?.avatar && (
                  <Image
                    src={pumpEmperor.token.user.avatar}
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                )}
                <Link
                  href={`/profile/${pumpEmperor?.token?.user?.username || ""}`}
                  className="text-xs font-normal"
                >
                  {pumpEmperor?.token?.user?.username || ""}
                </Link>
              </div>
              <p className="text-xs">
                {pumpEmperor?.created_at && getTimeAgo(pumpEmperor.created_at)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-normal text-[#79FF62]">
                market cap:{" "}
                {pumpEmperor?.token.marketcap
                  ? formatMarketCap(pumpEmperor?.token.marketcap)
                  : "0"}
              </p>
            </div>
            <p className="text-gray-300 font-normal text-xs">
              <span className="text-white font-bold">
                {pumpEmperor?.token?.name} ({pumpEmperor?.token?.symbol}):
              </span>{" "}
              {pumpEmperor?.token?.description}
            </p>
          </div>
        </div>
        </Link>
      )}

    </section>
  );
};
