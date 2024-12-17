import { deployerContract, web3Config } from "@/config";
import { parseEther, parseGwei } from "viem";
import { multicall, waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from "react";

export const deployToken = async (
  writeContractAsync: (params: any) => Promise<any>,
  nameToken: string,
  ticker: string,
  description: string,
  totalSupply: string,
  liquidityETHAmount: string,
  amountAntiSnipe: string,
  maxBuyPerWallet: string
): Promise<{ hash: string; tokenAddress: string } | false> => {
  try {
    const tx = await writeContractAsync({
      ...deployerContract,
      functionName: "createFun",
      args: [
        nameToken,
        ticker,
        description,
        totalSupply,
        0,
        parseEther(amountAntiSnipe),
        parseEther(maxBuyPerWallet),
      ],
      value: amountAntiSnipe
        ? parseEther(amountAntiSnipe + 10000000).toString()
        : "10000000",
    });

    const result = await waitForTransactionReceipt(web3Config, {
      hash: tx,
    });

    
    if (result.status === "success") {
      const tokenAddress = result.logs[0]?.address;
      if (!tokenAddress) {
        console.error("Token address not found in transaction logs.");
      }
      return { hash: tx, tokenAddress };
    }
    return false;
  } catch (e) {
    console.error("Error deploying token:", e);
    return false;
  }
};
