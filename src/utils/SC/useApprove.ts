import { poolContract, taraxaContract, web3Config } from "@/config";
import { waitForTransactionReceipt } from "@wagmi/core";
import { erc20Abi, parseEther } from "viem";

export const approveSell = async (
    writeContractAsync: (params: any) => Promise<any>,
    amountApprove: string,
    addressToken: string
  ) => {
    try {
      const tx = await writeContractAsync({
        address:addressToken,
        abi: erc20Abi,
        functionName: "approve",
        args: [poolContract.address, parseEther(amountApprove)],
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