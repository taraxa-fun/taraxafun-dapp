import { poolContract, web3Config } from "@/config";
import { waitForTransactionReceipt } from "@wagmi/core";
import { erc20Abi } from "viem";

export const approveSell = async (
  writeContractAsync: (params: any) => Promise<any>,
  addressToken: string
) => {
  try {
    const tx = await writeContractAsync({
      address: addressToken,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        poolContract.address,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
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
    return false;
  }
};
