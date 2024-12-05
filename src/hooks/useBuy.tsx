import { deployerContract, poolContract, web3Config } from "@/config";
import { parseEther } from "viem";
import { multicall, waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from "react";

export const buyToken = async (
  writeContractAsync: (params: any) => Promise<any>,
  funToken: string,
  minTokens: string,
  _affiliate: string,
  amountETH: string
) => {
  try {
    const tx = await writeContractAsync({
      ...poolContract,
      functionName: "buyTokens",
      args: [
        funToken,
        minTokens,
        _affiliate,
      ],
      value: parseEther(amountETH),
    });
    const result = await waitForTransactionReceipt(web3Config, {
      hash: tx,
    });
    if (result.status === "success") {
      return tx;
    }
    return false;
  } catch (e) {
    return false;
  }
};

