import { poolContract, taraxaContract, web3Config } from "@/config";
import { waitForTransactionReceipt } from "@wagmi/core";
import { erc20Abi, parseEther } from "viem";

export const sellToken = async (
  writeContractAsync: (params: any) => Promise<any>,
  funToken: string,
  tokenAmount: string,
  minETH: string,
  _affiliate: string
) => {
  console.log(funToken, tokenAmount, minETH, _affiliate);
  try {
    const tx = await writeContractAsync({
      ...poolContract,
      functionName: "sellTokens",
      args: [funToken, "100", 0, _affiliate],
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

export const approveSell = async (
  writeContractAsync: (params: any) => Promise<any>,
  amountApprove: string,
  addressToken: string
) => {
  try {
    const tx = await writeContractAsync({
      address: poolContract.address,
      abi: erc20Abi,
      functionName: "approve",
      args: [addressToken, parseEther(amountApprove)],
    });

    const result = await waitForTransactionReceipt(web3Config, {
      hash: tx,
    });

    if (result.status === "success") {
      return tx;
    }
    return false;
  } catch (e) {
    console.error("Error in approveSell:", e);
    return false;
  }
};
