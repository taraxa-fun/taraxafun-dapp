import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import TaraxaLogoChain from "../../../assets/logo/TARALogoChain.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useWriteContract } from "wagmi";
import { DialogTitle } from "@radix-ui/react-dialog";
import { getAmountTokens } from "@/utils/SC/getAmount";
import { buyToken } from "@/utils/SC/buyTokenSc";
import { showErrorToast, showSuccessToastTx } from "@/utils/toast/showToasts";

interface TradeDataType {
  amount: string;
  priorityFee: string;
  slippage: string;
}

type InputField = "amount" | "priorityFee" | "slippage";

export const BuySection = () => {
  const [errors, setErrors] = useState<string | null>(null);
  const initialTradeData = {
    amount: "",
    priorityFee: "",
    slippage: "1",
  };
  const [tradeData, setTradeData] = useState<TradeDataType>({
    amount: "",
    priorityFee: "",
    slippage: "1",
  });

  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const { toast } = useToast();
  const [copied, isCopied] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const router = useRouter();
  const { address: tokenAddress } = router.query;
  const handleInputChange = (value: string, field: InputField) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    const numValue = parseFloat(sanitizedValue);

    if (!isNaN(numValue) && numValue >= 0) {
      if (field === "slippage") {
        if (numValue <= 49) {
          setTradeData((prev) => ({ ...prev, [field]: sanitizedValue }));
        }
      } else {
        setTradeData((prev) => ({ ...prev, [field]: sanitizedValue }));
      }
    } else if (sanitizedValue === "") {
      setTradeData((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSetAmount = (amount: number) => {
    setTradeData((prev) => ({ ...prev, amount: amount.toString() }));
  };

  const validateForm = () => {
    if (!tradeData.amount.trim()) {
      setErrors("Amount is required");
      return false;
    }
    setErrors(null);
    return true;
  };

  const resetForm = () => {
    setTradeData(initialTradeData);
  };

  const handleSubmitBuy = async () => {
    if (!address) return showErrorToast("Please connect your wallet");
    setLoading(true); // Début du chargement
    try {
      if (!tradeData.amount) {
        showErrorToast("Please enter an amount and select a token");
        setLoading(false); // Fin du chargement en cas d'erreur
        return;
      }
      const amountOut = await getAmountTokens(
        tokenAddress as `0x${string}`,
        tradeData.amount
      );
      const slippagePercent = parseFloat(tradeData.slippage);
      const slippageValue = BigInt(Math.floor(slippagePercent * 100));
      const slippageRatio = BigInt(10000) - slippageValue;

      const minTokens = (
        (amountOut * slippageRatio) /
        BigInt(10000)
      ).toString(); // Calcul après slippage


      // Appel de la fonction buyToken
      const tx = await buyToken(
        writeContractAsync,
        tokenAddress as `0x${string}`,
        minTokens,
        address,
        tradeData.amount
      );

      if (tx) {
        showSuccessToastTx({
          description: "Transaction confirmed",
          txHash: tx,
        });
        resetForm();
      }
    } catch (error) {
      console.error("Error during buy:", error);
      showErrorToast("Failed to complete the purchase. Please try again.");
    } finally {
      setLoading(false); // Fin du chargement, que la transaction réussisse ou échoue
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
                value={tradeData.slippage}
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
            {/**  PRORITY FEE
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-base">Priority fee</label>
              <div className="flex gap-2 items-center border border-[#9A62FF] rounded mb-4">
                <input
                disabled
                  className="flex-1 bg-transparent p-4 outline-none focus:outline-none"
                  value={tradeData.priorityFee}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "priorityFee")
                  }
                  type="text"
                  placeholder="Enter priority fee"
                />
                <div className="flex items-center gap-1 p-4">
                  <Image
                    src={TaraxaLogoChain}
                    alt="Taraxa Logo Chain"
                    width={32}
                    height={32}
                  />
                  <span className="text-sm font-bold">TARA</span>
                </div>
              </div>
            </div>
            */}
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
          disabled={loading}
          value={tradeData.amount}
          onChange={(e) => handleInputChange(e.target.value, "amount")}
          type="text"
          placeholder="Enter amount"
        />
        <div className="flex items-center gap-1 p-4">
          <Image
            src={TaraxaLogoChain}
            alt="Taraxa Logo Chain"
            width={32}
            height={32}
          />
          <span>TARA</span>
        </div>
      </div>

      {errors && <div className="text-red-500 text-sm mb-4">{errors}</div>}
      <div className="flex gap-2 mb-4">
        <button
          className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
          onClick={() => handleSetAmount(100000)}
        >
          100k TARA
        </button>
        <button
          className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
          onClick={() => handleSetAmount(200000)}
        >
          200k TARA
        </button>
        <button
          className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
          onClick={() => handleSetAmount(300000)}
        >
          300k TARA
        </button>
        <button
          className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
          onClick={() => handleSetAmount(0)}
        >
          reset
        </button>
      </div>
      <button
        className="bg-[#5600AA] py-4 px-2 rounded text-sm font-normal w-full"
        disabled={loading}
        onClick={(e) => {
          if (!validateForm()) {
            e.preventDefault();
          } else {
            handleSubmitBuy();
          }
        }}
      >
        {loading ? "Loading..." : "Place trade"}
      </button>
    </>
  );
};
