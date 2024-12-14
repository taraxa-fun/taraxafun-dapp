import { deployerContract, web3Config } from "@/config";
import { parseEther, parseGwei } from "viem";
import {
  multicall,
  readContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
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
      try {
        const result = (await readContract(web3Config, {
          ...deployerContract,
          functionName: "supplyValue",
          args: [],
        })) as bigint;

        setData({
          suplyValue: result,
        });
      } catch (error) {
        console.error("Error fetching supply value:", error);
      }
    };

    if (account) fetch();
  }, [account, refresh, update]);
  return data;
};
