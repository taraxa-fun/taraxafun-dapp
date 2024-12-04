import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialogWithoutPrimClose";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const HowItWorksModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = Cookies.get("has_seen_how_it_works_modal");
    setIsOpen(hasSeenModal === undefined);
  }, []);

  const handleModalClose = () => {
    Cookies.set("has_seen_how_it_works_modal", "true", { expires: 365 });
    setIsOpen(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="text-sm font-semibold">
        (how it works)
      </DialogTrigger>
      <DialogContent className="px-8 py-4 text-center">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-8">
            how it works
          </DialogTitle>
          <DialogDescription className="text-base text-white text-center font-semibold">
            Taraxa.fun ensures safety by guaranteeing that all tokens created
            are rug-free. Every coin is fairly launched with no presale or team
            allocation.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <p className="text-base opacity-80 font-semibold">
            Step 1: Choose a token that catches your attention..
          </p>
          <p className="text-base opacity-80 font-semibold">
            Step 2: Purchase the token through the bonding curve mechanism.
          </p>
          <p className="text-base opacity-80 font-semibold">
            Step 3: Sell whenever you want to secure your profits—or cut your
            losses.
          </p>
          <p className="text-base opacity-80 font-semibold">
            Step 4: Once enough buyers join in and the token hits a $100k market
            cap...
          </p>
          <p className="text-base opacity-80 font-semibold">
            Step 5: $17k in liquidity is added to Raydium and permanently burned
          </p>
        </div>
        <button
          className="p-2 rounded w-full bg-[#5600AA] text-base font-normal"
          onClick={handleModalClose}
        >
          I'm ready to pump
        </button>
      </DialogContent>
    </Dialog>
  );
};
