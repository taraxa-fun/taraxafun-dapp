import { tokenData } from "@/data/tokenData";
import { TokenType } from "@/type/tokenType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import TaraxaLogoChain from "../../assets/logo/TARALogoChain.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleCopy } from "@/utils/copy";
import { useToast } from "@/hooks/use-toast";
import { getAmountTokens } from "@/hooks/usePool";
import { buyToken } from "@/hooks/useBuy";
import { useAccount, useWriteContract } from "wagmi";

interface TradeDataType {
  amount: string;
  priorityFee: string;
  slippage: string;
}

type InputField = "amount" | "priorityFee" | "slippage";

export const CardTransaction = () => {
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    "buy" | "sell"
  >("buy");
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
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
  const { id: coinId } = router.query;

  const token: TokenType | undefined = tokenData.find(
    (t) => t.id.toString() === String(coinId)
  );

  const resetForm = () => {
    setTradeData(initialTradeData);
  };

  const handleTypeSelect = (type: "buy" | "sell") => {
    setSelectedTransactionType(type);
  };

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

  const handleSubmitBuy = async () => {
    if (!address) return;

    setLoading(true); // Début du chargement
    try {
      if (!tradeData.amount) {
        toast({
          title: "Error",
          description: "Please enter an amount and select a token",
          variant: "destructive",
        });
        setLoading(false); // Fin du chargement en cas d'erreur
        return;
      }

      const amountOut = await getAmountTokens(
        "0xFd926F7f4a3CC1155A6131E115Ae0002e5fCdfF7",
        tradeData.amount
      );
      console.log(amountOut);

      const slippagePercent = parseFloat(tradeData.slippage);
      const slippageValue = BigInt(Math.floor(slippagePercent * 100));
      const slippageRatio = BigInt(10000) - slippageValue;

      const minTokens = (
        (amountOut * slippageRatio) /
        BigInt(10000)
      ).toString(); // Calcul après slippage
      console.log("Min Tokens:", minTokens);

      // Appel de la fonction buyToken
      const tx = await buyToken(
        writeContractAsync,
        "0xFd926F7f4a3CC1155A6131E115Ae0002e5fCdfF7",
        minTokens,
        address,
        tradeData.amount
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
        resetForm();
      }
    } catch (error) {
      console.error("Error during buy:", error);
      toast({
        title: "Error",
        description: "Failed to complete the purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Fin du chargement, que la transaction réussisse ou échoue
    }
  };

  return (
    <div>
      <div className="bg-[#2D0060] lg:p-8 p-4 w-full rounded-lg">
        <div className="flex items-center justify-between gap-2 mb-4">
          <button
            className={`flex-1 px-4 py-2 rounded-md ${
              selectedTransactionType === "buy"
                ? "bg-[#9A62FF] text-white"
                : "bg-[#9A62FF] text-white opacity-50"
            }`}
            onClick={() => handleTypeSelect("buy")}
          >
            Buy
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-md ${
              selectedTransactionType === "sell"
                ? "bg-[#9A62FF] text-white"
                : "bg-[#9A62FF] text-white opacity-50"
            }`}
            onClick={() => handleTypeSelect("sell")}
          >
            Sell
          </button>
        </div>
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
                  value={tradeData.slippage}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "slippage")
                  }
                  className="flex-1 bg-transparent p-4 outline-none border rounded border-[#9A62FF] focus:outline-none"
                  type="text"
                  placeholder="Enter slippage (max 49%)"
                />
                <p className="text-base font-normal text-[#A9A8AD]">
                  This is the maximum amount of slippage you are willing to
                  accept when placing trades
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-medium text-base">Priority fee</label>
                <div className="flex gap-2 items-center border border-[#9A62FF] rounded mb-4">
                  <input
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
            value={tradeData.amount}
            onChange={(e) => handleInputChange(e.target.value, "amount")}
            type="text"
            placeholder="Enter amount"
          />
          <div className="flex items-center gap-1 p-4">
            {selectedTransactionType === "sell" ? (
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
            ) : (
              <>
                {selectedToken ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={selectedToken.imagePath}
                      alt={selectedToken.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Image
                    src={TaraxaLogoChain}
                    alt="Taraxa Logo Chain"
                    width={32}
                    height={32}
                  />
                )}
                <span>{selectedToken?.symbol || "TARA"}</span>
              </>
            )}
          </div>
        </div>
        {errors && <div className="text-red-500 text-sm mb-4">{errors}</div>}

        {selectedTransactionType === "buy" ? (
          <div className="flex gap-2 mb-4">
            <button
              className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
              onClick={() => handleSetAmount(100000)}
            >
              100k {selectedToken?.symbol || "TARA"}
            </button>
            <button
              className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
              onClick={() => handleSetAmount(200000)}
            >
              200k {selectedToken?.symbol || "TARA"}
            </button>
            <button
              className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
              onClick={() => handleSetAmount(300000)}
            >
              300k {selectedToken?.symbol || "TARA"}
            </button>
            <button
              className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
              onClick={() => handleSetAmount(0)}
            >
              reset
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mb-4">
            <button
              className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
              onClick={() => handleSetAmount(0)}
            >
              reset
            </button>
            <button
              className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
              onClick={() => handleSetAmount(100000)}
            >
              25%
            </button>
            <button
              className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
              onClick={() => handleSetAmount(200000)}
            >
              50%
            </button>
            <button
              className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
              onClick={() => handleSetAmount(300000)}
            >
              75%
            </button>
            <button
              className="bg-[#5600AA] p-2 rounded text-sm font-normal flex-1"
              onClick={() => handleSetAmount(300000)}
            >
              100%
            </button>
          </div>
        )}

        <button
          className="bg-[#5600AA] py-4 px-2 rounded text-sm font-normal w-full"
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
      </div>
      <div className="flex flex-col gap-2 mx-auto">
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-normal">CA:</p>
          <div className="flex flex-col items-center w-full">
            {token && token.address && (
              <div className="text-sm w-full">
                <span className="text-sm font-normal text-start border rounded border-gray-300 text-gray-300 p-2.5 bg-transparent block w-full">
                  {token.address ? token.address : ""}
                </span>

                <div className="flex justify-between mt-2 w-full">
                  <a
                    href={`https://etherscan.io/address/${token.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9A62FF] cursor-pointer"
                  >
                    view on etherscan
                  </a>
                  <button
                    className="hover:text-[#9A62FF] cursor-pointer"
                    onClick={() => handleCopy(token.address, isCopied)}
                  >
                    {copied ? "copied" : "copy address"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
