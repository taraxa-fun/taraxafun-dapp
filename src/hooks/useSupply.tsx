import { deployerContract, web3Config } from "@/config";
import { parseEther, parseGwei } from "viem";
import { multicall, waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from "react";

export const useSupply = (
  account: `0x${string}`,
  refresh: any,
  update: any
) => {
  const [data, setData] = useState({
    suplyValue: BigInt(0),
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await multicall(web3Config, {
        contracts: [
          {
            ...deployerContract,
            functionName: "supplyValue",
            args: [],
          },
        ],
      });
      setData({
        suplyValue: res[0].result as bigint,
      });
    };
    if (account) fetch();
  }, [account, refresh, update]);
  return data;
};
