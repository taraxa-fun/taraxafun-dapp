import { readContract } from "@wagmi/core";
import { deployerContract, poolContract, web3Config } from "@/config";
import { erc20Abi, parseEther } from "viem";

export const getAmountTokens = async (tokenAddress: string, amountIn: string): Promise<bigint> => {
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


export const getAmountOutETH = async (tokenAddress: string, amountIn: string): Promise<bigint> => {
  const result = await readContract(web3Config, {
    address: poolContract.address,
    abi: poolContract.abi,
    functionName: "getAmountOutETH",
    args: [tokenAddress, parseEther(amountIn)],
  });
  if (typeof result !== "bigint") {
    throw new Error("Expected bigint result from readContract");
  }
  return result;
};

export const getBalance = async (tokenAddress: `0x${string}`, accountAddress: `0x${string}`): Promise<bigint> => {
  const result = await readContract(web3Config, {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [accountAddress],
  });
  if (typeof result !== "bigint") {
    throw new Error("Expected bigint result from readContract");
  }
  return result;
}

