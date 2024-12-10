import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logoPlaceHolder from "../../assets/logo/taraxafunLogo.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/User/useAuthStore";
import { uploadImage } from "@/utils/uploadImageUser";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

interface ModalProfileProps {
  trigger: React.ReactNode;
}

export const ModalProfile: React.FC<ModalProfileProps> = ({ trigger }) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bioText, setBioText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { jwt, userMe, updateUserMe } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();
  const [username, setUsername] = useState(userMe?.user.username || "");
  const [filedChanged, setFieldChanged] = useState(false);

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setBioText(text);
  
    if (text !== userMe?.user.description) {
      setFieldChanged(true);
    } else {
      setFieldChanged(false);
    }
  };
  
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setUsername(text);
  
    if (text !== userMe?.user.username) {
      setFieldChanged(true);
    } else {
      setFieldChanged(false);
    }
  };
  

  const handleModalClose = () => {
    setProfileImage(null);
    setError(null);
    setBioText("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      setError("Image must be less than 500KB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("File must be an image");
      return;
    }
    setFieldChanged(true);
    setProfileImage(file);
    setError(null);
  };


  const bioCharacterLimit = 255;
  const bioCharactersRemaining = bioCharacterLimit - bioText.length;

  const handleSubmit = async () => {
    if (!jwt) return;
    if (!profileImage && !bioText && username === userMe?.user.username) {
      setError("Please update your profile or upload an image");
      return;
    }
    try {
      const updatedUserData = {
        username,
        bio: bioText,
      };
      if (profileImage && filedChanged) {
        setUploading(true);
        setError(null);
        const result = await uploadImage(
          profileImage,
          jwt,
          "/user/upload-avatar"
        );
        if (!result.success) {
          console.error("Image upload failed");
        }
      }
      const res = await updateUserMe(updatedUserData);
      if (res.success) {
        toast({
          title: "Success",
          description: "Your profile has been updated",
          className: "bg-[#201F23] border border-green-500",
        });
        const updatedUsername = res.data.user.username; 
        router.push(`/profile/${updatedUsername}`);
      }
    } catch (err) {
      setError((err as Error).message);
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && handleModalClose()}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
              ) : userMe?.user.avatar ? (
                <Image
                  src={userMe.user.avatar}
                  alt="User Avatar"
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
            className={`cursor-pointer text-center text-sm font-normal ${
              uploading ? "opacity-50" : ""
            }`}
          >
            {uploading ? "Uploading..." : "(edit profile picture)"}
          </label>

          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-normal mb-1">Username</label>
            <input
              className="flex-1 bg-transparent p-1 border rounded border-white outline-none focus:outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-normal">Bio (optional)</label>
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
        <button
          className="p-2 rounded w-full bg-[#5600AA] text-base font-normal"
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Register"}
        </button>
      </DialogContent>
    </Dialog>
  );
};
