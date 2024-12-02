import { deployerContract, web3Config } from "@/config";
import { parseEther } from "viem";
import { multicall, waitForTransactionReceipt } from "@wagmi/core";

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
          parseEther(totalSupply),
          parseEther(liquidityETHAmount),
          antiSnipe,
          parseEther(amountAntiSnipe),
          parseEther(maxBuyPerWallet),
        ],
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