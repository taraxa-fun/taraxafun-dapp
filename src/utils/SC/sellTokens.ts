import { poolContract, taraxaContract, web3Config } from "@/config";
import { waitForTransactionReceipt } from "@wagmi/core";
import { erc20Abi, parseEther } from "viem";

export const sellToken = async (
  writeContractAsync: (params: any) => Promise<any>,
  funToken: string,
  tokenAmount: string,
  minETH: BigInt,
  _affiliate: string
) => {
  console.log(parseEther(tokenAmount), minETH);
  try {
    const tx = await writeContractAsync({
      ...poolContract,
      functionName: "sellTokens",
      args: [funToken, parseEther(tokenAmount), 0, _affiliate],
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


