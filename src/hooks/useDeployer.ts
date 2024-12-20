import { deployerContract, web3Config } from "@/config";
import { multicall } from "@wagmi/core";
import { useEffect, useState } from "react";

export const useDeployer = () => {
  const [data, setData] = useState({
    antiSniperPercentage: BigInt(0),
    initialReserveTARA: BigInt(0),
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await multicall(web3Config, {
        contracts: [
          {
            ...deployerContract,
            functionName: "antiSnipePer",
            args: [],
          },
          {
            ...deployerContract,
            functionName: "initialReserveTARA",
            args: [],
          },
        ],
      });

      setData({
        antiSniperPercentage: res[0].result as bigint,
        initialReserveTARA: res[1].result as any,
      });
      console.log(res[0].result);
    };
    fetch();
  }, []);

  return data;
};
