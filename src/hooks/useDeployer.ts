import { deployerContract, web3Config } from "@/config";
import { parseEther, parseGwei } from "viem";
import { multicall, waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from "react";

export const useDeployer = () => {
  const [data, setData] = useState({
    antiSniperPercentage: "0",
    initialReserveETH: BigInt(0),
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
      console.log(res[1].result);

      setData({
        antiSniperPercentage: (
          (res[0].result as bigint) ?? BigInt(0)
        ).toString(),
        initialReserveETH: res[1].result as any,
      });
    };
    fetch();
  }, []);

  return data;
};
