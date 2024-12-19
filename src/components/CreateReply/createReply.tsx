import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useAuthStore } from "@/store/User/useAuthStore";
import { useSingleTokenStore } from "@/store/SingleToken/useSingleTokenStore";
import { useRepliesTokenIdStore } from "@/store/SingleToken/useRepliesTokenIdStore";
import { useToast } from "@/hooks/use-toast";
import { showErrorToast } from "@/utils/toast/showToasts";

export const CreateReply = () => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const maxCharacters = 255;
  const charactersRemaining = maxCharacters - comment.length;

  const { jwt } = useAuthStore();
  const { tokenData } = useSingleTokenStore();
  const { createReply } = useRepliesTokenIdStore();
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxCharacters) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (comment.trim().length === 0) {
      showErrorToast("Please enter a comment");
      return;
    }

    if (!jwt || !tokenData?.address) {
      showErrorToast("please connect to post a comment");
      return;
    }

    setIsSubmitting(true);
    const success = await createReply(jwt, tokenData.address, comment.trim());
    if (success) {
      setComment("");
      setIsOpen(false);
    } else {
      console.error("Failed to post comment.");
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className="font-normal text-base hover:underline"
        onClick={() => setIsOpen(true)}
      >
        (post a reply)
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-sm font-normal">
            Add a comment
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-1">
          <label className="text-base text-[#9A62FF]">Comment</label>
          <textarea
            className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF] min-h-[100px]"
            placeholder="Enter your comment"
            value={comment}
            onChange={handleCommentChange}
          />
          <div className="text-right text-sm text-gray-400">
            {charactersRemaining}/{maxCharacters}
          </div>
        </div>
        <button
          className={`p-2 rounded w-full text-base font-normal ${
            comment.trim().length > 0 && !isSubmitting
              ? "bg-[#5600AA] text-white hover:bg-[#8100FB]"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={comment.trim().length === 0 || isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post reply"}
        </button>
      </DialogContent>
    </Dialog>
  );
};
