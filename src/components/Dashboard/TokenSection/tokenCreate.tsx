import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export const TokenCreate = () => {
  return (
    <div className="mx-auto text-center pb-10">
        <Link href="/create" className="text-[28px]">
          (-----create a new coin-----)
        </Link>
    </div>
  );
};
