import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatEther, parseEther } from "viem";
import { useBalanceAllowanceOfUser } from "@/hooks/useBalanceAllowanceOfUser";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useSingleTokenStore } from "@/store/SingleToken/useSingleTokenStore";
import { approveSell } from "@/utils/SC/useApprove";
import { getAmountOutETH } from "@/utils/SC/getAmount";
import { sellToken } from "@/utils/SC/sellTokens";
import { showErrorToast, showSuccessToastTx } from "@/utils/toast/showToasts";

export const SellSection = () => {
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState<number>(1);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const router = useRouter();
  const { address: tokenAddress } = router.query;
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { tokenData } = useSingleTokenStore();

  const { balanceOfUser, allowanceOfUser } = useBalanceAllowanceOfUser(
    tokenAddress as `0x${string}`,
    address as `0x${string}`,
    update
  );
  const handleInputChange = (
    value: string,
    inputField: "amount" | "slippage"
  ) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    const numValue = parseFloat(sanitizedValue);

    if (inputField === "amount") {
      setAmount(sanitizedValue);
    } else if (inputField === "slippage") {
      if (sanitizedValue === "") {
        setSlippage(0);
      } else if (!isNaN(numValue) && numValue <= 49) {
        setSlippage(numValue);
      }
    }
  };

  const handleSetPercentage = (percentage: number) => {
    if (!balanceOfUser) return;
    const balanceInTokens = formatEther(balanceOfUser);
    const calculatedAmount = (Number(balanceInTokens) * percentage) / 100;
    setAmount(calculatedAmount.toString());
  };

  const handleSubmitSell = async () => {
    if (!address) {
      return showErrorToast("Please connect your wallet");
    }

    setLoading(true);
    try {
      if (!amount) {
        showErrorToast("Please enter an amount and select a token");
        setLoading(false);
        return;
      }

      if (
        balanceOfUser &&
        parseFloat(amount) > parseFloat(formatEther(balanceOfUser))
      ) {
        showErrorToast("Insufficient balance");
        setLoading(false);
        return;
      }

      if (!allowanceOfUser || parseEther(amount) > allowanceOfUser) {
        const approveTx = await approveSell(
          writeContractAsync,
          amount,
          tokenAddress as `0x${string}`
        );

        if (!approveTx) {
          showErrorToast("Approval failed. Please try again.");
          setLoading(false);
          return;
        }
      } else {
        showErrorToast("Approval not required, sufficient allowance available.");
      }

      const amountOut = await getAmountOutETH(
        tokenAddress as `0x${string}`,
        amount
      );

      const slippageValue = BigInt(Math.floor(slippage * 100));
      const slippageRatio = BigInt(10000) - slippageValue;

      const minTokens = (amountOut * slippageRatio) / BigInt(10000);

      const tx = await sellToken(
        writeContractAsync,
        tokenAddress as `0x${string}`,
        amount,
        minTokens,
        address
      );

      if (tx) {
        showSuccessToastTx({
          description: "Transaction confirmed",
          txHash: tx,
        });
        setAmount("");
        setSlippage(1);
        setUpdate(update + 1);
      }
    } catch (error) {
      showErrorToast("Failed to complete the transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-1">
        {/*
        {selectedTransactionType === "buy" && (
          <button className="text-white" onClick={handleTokenSwitch}>
            (switch to {selectedToken ? "TARA" : token?.symbol})
          </button>
        )}
           */}
        <Dialog>
          <DialogTrigger className="text-white underline text-sm">
            Set max. slippage (%)
          </DialogTrigger>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-base">
                Set max. slippage (%)
              </label>
              <input
                value={slippage}
                onChange={(e) => handleInputChange(e.target.value, "slippage")}
                className="flex-1 bg-transparent p-4 outline-none border rounded border-[#9A62FF] focus:outline-none"
                type="text"
                placeholder="Enter slippage (max 49%)"
              />
              <p className="text-base font-normal text-[#A9A8AD]">
                This is the maximum amount of slippage you are willing to accept
                when placing trades
              </p>
            </div>
            <DialogClose asChild>
              <button className="p-2 rounded w-full bg-[#5600AA] text-base font-normal">
                Close
              </button>
            </DialogClose>
          </DialogContent>
          <DialogClose className="absolute right-4 top-4"></DialogClose>
        </Dialog>
      </div>
      <div className="flex gap-2 items-center border border-[#9A62FF] rounded mb-4">
        <input
          className="flex-1 bg-transparent p-4 outline-none focus:outline-none"
          value={amount}
          onChange={(e) => handleInputChange(e.target.value, "amount")}
          type="text"
          placeholder="Enter amount"
        />
        {tokenData && (
          <div className="flex items-center gap-1 p-4">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                {/** 
                <Image
                  src={tokenData. || ""}
                  alt={tokenUrl?.name || ""}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
                */}
              </div>
              <span>{tokenData.symbol}</span>
            </div>
          </div>
        )}
      </div>

      {errors && <div className="text-red-500 text-sm mb-4">{errors}</div>}

      <div className="flex gap-2 mb-4">
        <button
          className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
          onClick={() => setAmount("")} // Réinitialiser à vide
        >
          reset
        </button>
        <button
          className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
          onClick={() => handleSetPercentage(25)} // 25% de la balance
        >
          25%
        </button>
        <button
          className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
          onClick={() => handleSetPercentage(50)} // 50% de la balance
        >
          50%
        </button>
        <button
          className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
          onClick={() => handleSetPercentage(75)} // 75% de la balance
        >
          75%
        </button>
        <button
          className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
          onClick={() => handleSetPercentage(99)} // 100% de la balance
        >
          100%
        </button>
      </div>

      <button
        className="bg-[#5600AA] py-4 px-2 rounded text-sm font-normal w-full"
        onClick={handleSubmitSell}
      >
        {loading ? "Loading..." : "Place trade"}
      </button>
    </>
  );
};
