import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logoPlaceHolder from "../../assets/logo/taraxafunLogo.png";
import Image from "next/image";
import { useState } from "react";

export const ModalProfile = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bioText, setBioText] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setBioText(text);
  };

  const bioCharacterLimit = 255;
  const bioCharactersRemaining = bioCharacterLimit - bioText.length;

  return (
    <Dialog>
      <DialogTrigger className="p-1 w-full bg-transparent border border-white text-xs font-normal rounded flex items-center">
        <div className="w-4 h-4 rounded-full overflow-hidden mr-2">
          <Image
            src={logoPlaceHolder}
            alt="Placeholder"
            width={16}
            height={16}
            className="w-full h-full object-cover"
          />
        </div>
        donpumpfun (5M $TARA)
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Create your profile
          </DialogTitle>
          <div className="pb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              {profileImage ? (
                <Image
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={logoPlaceHolder}
                  alt="Placeholder"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          <label
            htmlFor="profileImage"
            className="cursor-pointer text-center text-sm font-normal"
          >
            (edit profile picture)
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col ">
            <label className="text-sm font-normal mb-1">username</label>
            <input className="flex-1 bg-transparent p-1 border rounded border-white  outline-none focus:outline-none" />
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-normal">Bio (optionnal)</label>
              <div className="text-sm text-gray-400">
                {bioCharactersRemaining}/{bioCharacterLimit}
              </div>
            </div>
            <textarea
              className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF] min-h-[100px]"
              placeholder="Enter your bio"
              value={bioText}
              onChange={handleBioChange}
            />
          </div>
        </div>
        <button className="p-2 rounded w-full bg-[#5600AA] text-base font-normal">
          Register
        </button>
      </DialogContent>
    </Dialog>
  );
};
