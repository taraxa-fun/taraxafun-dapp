import { tokenData } from "@/data/tokenData";
import { toast } from "@/hooks/use-toast";
import { TokenType } from "@/type/tokenType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAmountOutETH, getBalance } from "@/hooks/usePool";
import { approveSell, sellToken } from "@/hooks/useSell";
import { formatEther, parseEther } from "viem";

export const SellSection = () => {
  const [balance, setBalance] = useState<bigint | null>(null);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState<number>(1);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const router = useRouter();
  const { address: tokenAddress } = router.query;
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const token: TokenType | undefined = tokenData.find(
    (t) => t.address.toString() === tokenAddress
  );

  useEffect(() => {
    if (address) {
      getBalance("0x670C0728e70ac7c2E4f5E0917F9BBFcaF6Fbef61", address)
        .then((balance) => {
          setBalance(balance);
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
          setBalance(null);
        });
    }
  }, []);

  const handleInputChange = (
    value: string,
    inputField: "amount" | "slippage"
  ) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    const numValue = parseFloat(sanitizedValue);

    if (!isNaN(numValue) && numValue >= 0) {
      if (inputField === "slippage" && numValue > 49) {
        return;
      }
      if (inputField === "amount") {
        setAmount(sanitizedValue);
      } else if (inputField === "slippage") {
        setSlippage(parseFloat(sanitizedValue));
      }
    } else if (sanitizedValue === "") {
      if (inputField === "amount") {
        setAmount("");
      } else if (inputField === "slippage") {
        setSlippage(1);
      }
    }
  };
  const handleSetPercentage = (percentage: number) => {
    if (!balance) return; 
    const balanceInTokens = parseFloat(formatEther(balance)); 
    console.log(parseFloat(formatEther(balance)));
    const calculatedAmount = (balanceInTokens * percentage) / 100;
    setAmount(calculatedAmount.toString()); 
  };

  const handleSubmitSell = async () => {
    if (!address) {
      return toast({
        title: "Error",
        description: "Please connect your wallet",
        variant: "destructive",
      });
    }
  
    setLoading(true);
    try {
      if (!amount) {
        toast({
          title: "Error",
          description: "Please enter an amount and select a token",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
  
      if (balance && parseFloat(amount) > parseFloat(formatEther(balance))) {
        toast({
          title: "Error",
          description: "Insufficient balance",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      const approveTx = await approveSell(
        writeContractAsync,
        amount,
        "0x670C0728e70ac7c2E4f5E0917F9BBFcaF6Fbef61"
      );
  
      if (!approveTx) {
        toast({
          title: "Error",
          description: "Approval failed. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
 
      
      const amountOut = await getAmountOutETH(
        "0x670C0728e70ac7c2E4f5E0917F9BBFcaF6Fbef61",
        amount
      );
  
      const slippageValue = BigInt(Math.floor(slippage * 100));
      const slippageRatio = BigInt(10000) - slippageValue;
  
      const minTokens = (
        (amountOut * slippageRatio) /
        BigInt(10000)
      ).toString();
  
      const tx = await sellToken(
        writeContractAsync,
        "0x670C0728e70ac7c2E4f5E0917F9BBFcaF6Fbef61",
        amount,
        minTokens,
        address
      );
  
      if (tx) {
        toast({
          title: "Transaction confirmed",
          description: (
            <div className="flex items-center justify-between gap-4 min-w-[300px]">
              <p className="text-base font-normal">Transaction confirmed</p>
              <a
                href={`https://etherscan.io/tx/${tx}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#9A62FF] text-white px-4 py-2 rounded text-sm hover:bg-[#8100FB] transition-colors whitespace-nowrap"
              >
                View Transaction
              </a>
            </div>
          ),
          className: "bg-[#201F23] border border-green-500",
        });
        setAmount("");
        setSlippage(1);
        setUpdate(update + 1);
      }
    } catch (error) {
      console.error("Error during sell:", error);
      toast({
        title: "Error",
        description: "Failed to complete the transaction. Please try again.",
        variant: "destructive",
      });
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
        <div className="flex items-center gap-1 p-4">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={token?.imagePath || ""}
                alt={token?.name || ""}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span>{token?.symbol}</span>
          </div>
        </div>
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
          onClick={() => handleSetPercentage(100)} // 100% de la balance
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
