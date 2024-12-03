import { deployerContract, web3Config } from "@/config";
import { parseEther } from "viem";
import { multicall, waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from "react";

export const deployToken = async (
  writeContractAsync: (params: any) => Promise<any>,
  nameToken: string,
  ticker: string,
  description: string,
  totalSupply: string,
  liquidityETHAmount: string,
  antiSnipe: boolean,
  amountAntiSnipe: string,
  maxBuyPerWallet: string
) => {
  try {
    const tx = await writeContractAsync({
      ...deployerContract,
      functionName: "CreateFun",
      args: [
        nameToken,
        ticker,
        description,
        totalSupply,
        liquidityETHAmount,
        antiSnipe,
        parseEther(amountAntiSnipe),
        parseEther(maxBuyPerWallet),
      ],
      value: "10000000",
    });
    const result = await waitForTransactionReceipt(web3Config, {
      hash: tx,
    });
    if (result.status === "success") {
      return tx;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

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
