import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export const CreateReply = () => {
  const [comment, setComment] = useState("");
  const maxCharacters = 255;
  const charactersRemaining = maxCharacters - comment.length;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxCharacters) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (comment.trim().length === 0) {
      console.log("Cannot post an empty comment.");
      return;
    }

    console.log("submit:", comment);
    setComment("");
  };

  return (
    <Dialog>
      <DialogTrigger className="font-normal text-base hover:underline">
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
            comment.trim().length > 0
              ? "bg-[#5600AA] text-white hover:bg-[#8100FB]"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={comment.trim().length === 0}
        >
          Post reply
        </button>
      </DialogContent>
    </Dialog>
  );
};
