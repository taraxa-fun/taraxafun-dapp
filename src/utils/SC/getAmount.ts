import { readContract } from "@wagmi/core";
import { poolContract, web3Config } from "@/config";
import { parseEther } from "viem";

export const getAmountTokens = async (
  tokenAddress: string,
  amountIn: string
): Promise<bigint> => {
  const result = await readContract(web3Config, {
    address: poolContract.address,
    abi: poolContract.abi,
    functionName: "getAmountOutTokens",
    args: [tokenAddress, parseEther(amountIn)],
  });
  if (typeof result !== "bigint") {
    throw new Error("Expected bigint result from readContract");
  }
  return result;
};

export const getAmountOutTARA = async (
  tokenAddress: string,
  amountIn: string
): Promise<bigint> => {
  const result = await readContract(web3Config, {
    address: poolContract.address,
    abi: poolContract.abi,
    functionName: "getAmountOutTARA",
    args: [tokenAddress, parseEther(amountIn)],
  });
  if (typeof result !== "bigint") {
    throw new Error("Expected bigint result from readContract");
  }
  return result;
};
