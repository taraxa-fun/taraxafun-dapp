import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TokenCreate = () => {
  return (
    <div className="mx-auto text-center pb-10">
      <Dialog>
        <DialogTrigger className="text-[28px]">
          (-----create a new coin-----)
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your profile</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
