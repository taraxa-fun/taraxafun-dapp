import { readContract } from "@wagmi/core";
import { web3Config } from "@/config";
import { erc20Abi } from "viem";

export const getBalance = async (
  tokenAddress: `0x${string}`,
  accountAddress: `0x${string}`
): Promise<any> => {
  const result = await readContract(web3Config, {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [accountAddress],
  });
  return result;
};
