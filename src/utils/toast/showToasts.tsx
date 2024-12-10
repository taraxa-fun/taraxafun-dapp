// utils/toast.ts
import { toast } from "@/hooks/use-toast";

interface SuccessToastProps {
  title?: string;
  description: string;
  txHash?: string; 
}

export const showSuccessToastTx = ({
  title = "Success",
  description,
  txHash,
}: SuccessToastProps) => {
  toast({
    title,
    description: txHash ? (
      <div className="flex items-center justify-between gap-4 min-w-[300px]">
        <p className="text-base font-normal">{description}</p>
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#9A62FF] text-white px-4 py-2 rounded text-sm hover:bg-[#8100FB] transition-colors whitespace-nowrap"
        >
          View Transaction
        </a>
      </div>
    ) : (
      description
    ),
    className: "w-full border border-[#79FF62] bg-[#201F23]",
  });
};

export const showErrorToast = (description: string) => {
  toast({
    title: "Error",
    description,
    variant: "destructive",
  });
};
