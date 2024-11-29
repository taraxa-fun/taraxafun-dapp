import { useState } from "react";
import { toast } from "react-toastify";
import TaraxaLogoChain from "../../assets/logo/TARALogoChain.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

interface TokenData {
  name: string;
  ticker: string;
  description: string;
  image: File | null;
  initialSupply: string;
  bondingCurve: string;
  maxBuy: string;
  maxBuyAmount: string;
  socialLinks: {
    twitter: string;
    telegram: string;
    website: string;
  };
}

export const CreateToken = () => {
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    ticker: "",
    description: "",
    image: null,
    initialSupply: "",
    bondingCurve: "linear",
    maxBuy: "no",
    maxBuyAmount: "",
    socialLinks: {
      twitter: "",
      telegram: "",
      website: "",
    },
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [isDialogAllowed, setIsDialogAllowed] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const validateForm = () => {
    if (!tokenData.name.trim()) {
      setErrors("Name is required");
      return false;
    }

    if (!tokenData.ticker.trim()) {
      setErrors("Ticker is required");
      return false;
    }

    if (!tokenData.description.trim()) {
      setErrors("Description is required");
      return false;
    }

    if (!tokenData.image) {
      setErrors("Image is required");
      return false;
    }
    if (showAdvanced && !tokenData.initialSupply.trim()) {
      setErrors("Initial supply is required");
      return false;
    }
    if (tokenData.maxBuy === "yes" && !tokenData.maxBuyAmount?.trim()) {
      setErrors("Max buy amount is required when max buy is enabled");
      return false;
    }

    setErrors(null);
    return true;
  };

  type TokenKey = keyof typeof tokenData;
  type SocialKey = keyof typeof tokenData.socialLinks;

  const handleInputChange = (key: TokenKey, value: string) => {
    setTokenData((prev) => ({ ...prev, [key]: value }));
    setErrors(null);
  };

  const handleSocialChange = (key: SocialKey, value: string) => {
    setTokenData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value },
    }));
  };

  const handleFileChange = (file: File | null) => {
    setTokenData((prev) => ({ ...prev, image: file }));
  };

  const handleMaxBuyChange = (value: "no" | "yes") => {
    setTokenData((prev) => ({
      ...prev,
      maxBuy: value,
      maxBuyAmount: value === "no" ? "" : prev.maxBuyAmount,
    }));
  };

  const handleSubmit = () => {
    const { name, ticker, description, image } = tokenData;
    if (!name || !ticker || !description || !image) {
      toast.error("Please fill in all required fields.");
      return;
    }
    console.log("Token Data:", tokenData);
    toast.success("Token created successfully!");
  };

  return (
    <section className="pt-32 pb-20 lg:w-6/12 w-12/12 md:w-8/12 mx-auto max-w-lg px-4">
      <div className="relative w-full mb-8">
        {/* 
         */}
        <Link
          href="/"
          className="font-semibold text-md cursor-pointer absolute left-0 top-1/2 -translate-y-1/2"
        >
          (go back)
        </Link>
        {/* Centered H2 */}
        <h2 className="knewave text-[40px] bg-gradient-to-b from-[#D6C8FF] to-[#8100FB] text-transparent bg-clip-text title-shadow text-center">
          Create token
        </h2>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[#9A62FF] text-base font-medium">Name</label>
          <input
            type="text"
            value={tokenData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF]"
            placeholder="Enter token name"
          />
        </div>

        {/* Ticker */}
        <div className="flex flex-col gap-2">
          <label className="text-[#9A62FF] text-base font-medium">Ticker</label>
          <input
            type="text"
            value={tokenData.ticker}
            onChange={(e) => handleInputChange("ticker", e.target.value)}
            className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF]"
            placeholder="Enter token ticker"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-[#9A62FF] text-base font-medium">
            Description
          </label>
          <textarea
            value={tokenData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF] min-h-[100px]"
            placeholder="Enter token description"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label className="text-[#9A62FF] text-base font-medium">
            Image or video
          </label>
          <div className="relative border flex-col space-y-2 border-white rounded-lg p-4 flex items-center justify-between">
            {tokenData.image ? (
              <div className="w-full flex flex-col items-center gap-4">
                <img
                  src={URL.createObjectURL(tokenData.image)}
                  alt="Preview"
                  className="max-h-[200px] object-contain rounded-lg"
                />
                <label className="bg-[#9A62FF] font-normal text-white px-3 py-2 rounded-lg cursor-pointer">
                  Select another file
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files[0]) {
                        handleFileChange(files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="rgba(255,255,255,1)"
                >
                  <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
                </svg>
                <p>drag and drop an image or video</p>
                <label className="bg-[#9A62FF] font-normal text-white px-3 py-2 rounded-lg cursor-pointer">
                  Select file
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files[0]) {
                        handleFileChange(files[0]);
                      }
                    }}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mt-6">
          <button
            className="flex items-center gap-2 text-[#9A62FF] hover:opacity-80"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <span>Advanced options</span>
            {showAdvanced ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="rgba(154,98,255,1)"
              >
                <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="rgba(154,98,255,1)"
              >
                <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z" />
              </svg>
            )}
          </button>

          {showAdvanced && (
            <div className="mt-4 p-6 bg-[#2D0060] rounded-lg space-y-6">
              {/* Initial Supply */}
              <div className="flex flex-col gap-2">
                <label className="text-[#9A62FF] text-base font-medium">
                  Initial supply
                </label>
                <input
                  type="text"
                  value={tokenData.initialSupply}
                  onChange={(e) =>
                    handleInputChange("initialSupply", e.target.value)
                  }
                  className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF]"
                  placeholder="Enter initial supply"
                />
              </div>

              {/* Bonding Curve */}
              <div className="space-y-4">
                <label className="text-[#9A62FF] text-base font-medium">
                  Bonding curve type
                </label>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bondingCurve"
                        value="linear"
                        checked={tokenData.bondingCurve === "linear"}
                        onChange={(e) =>
                          handleInputChange("bondingCurve", e.target.value)
                        }
                        className="w-4 h-4 accent-[#9A62FF]"
                      />
                      <span className="text-white">Linear (default)</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-300 ml-6">
                      Steady price growth, predictable and simple.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bondingCurve"
                        value="exponential"
                        checked={tokenData.bondingCurve === "exponential"}
                        onChange={(e) =>
                          handleInputChange("bondingCurve", e.target.value)
                        }
                        className="w-4 h-4 accent-[#9A62FF]"
                      />
                      <span className="text-white">Exponential</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-300 ml-6">
                      Faster price increase, higher potential returns.
                    </p>
                  </div>
                </div>
              </div>
              {/* max buy per wallet */}
              <div className="space-y-4">
                <label className="text-[#9A62FF] text-base font-medium">
                  Max buy per wallet
                </label>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="maxBuy"
                      value="no"
                      checked={tokenData.maxBuy === "no"}
                      onChange={() => handleMaxBuyChange("no")}
                      className="w-4 h-4 accent-[#9A62FF]"
                    />
                    <span className="text-white">No (default)</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="maxBuy"
                        value="yes"
                        checked={tokenData.maxBuy === "yes"}
                        onChange={() => handleMaxBuyChange("yes")}
                        className="w-4 h-4 accent-[#9A62FF]"
                      />
                      <span className="text-white">Yes</span>
                    </div>
                    {tokenData.maxBuy === "yes" && (
                      <div className="ml-6">
                        <input
                          type="text"
                          value={tokenData.maxBuyAmount}
                          onChange={(e) =>
                            handleInputChange("maxBuyAmount", e.target.value)
                          }
                          placeholder=""
                          className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF] w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-6">
          <button
            className="flex items-center gap-2 text-[#9A62FF] hover:opacity-80"
            onClick={() => setShowSocial(!showSocial)}
          >
            <span>Social links</span>
            {showSocial ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="rgba(154,98,255,1)"
              >
                <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="rgba(154,98,255,1)"
              >
                <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z" />
              </svg>
            )}
          </button>

          {showSocial && (
            <div className="mt-4 p-6 bg-[#2D0060] rounded-lg space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#9A62FF] text-base font-medium">
                  Twitter link (optional)
                </label>
                <input
                  type="text"
                  value={tokenData.socialLinks.twitter}
                  onChange={(e) =>
                    handleSocialChange("twitter", e.target.value)
                  }
                  className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF]"
                  placeholder="Enter Twitter link"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#9A62FF] text-base font-medium">
                  Telegram link (optional)
                </label>
                <input
                  type="text"
                  value={tokenData.socialLinks.telegram}
                  onChange={(e) =>
                    handleSocialChange("telegram", e.target.value)
                  }
                  className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF]"
                  placeholder="Enter Telegram link"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#9A62FF] text-base font-medium">
                  Website link (optional)
                </label>
                <input
                  type="text"
                  value={tokenData.socialLinks.website}
                  onChange={(e) =>
                    handleSocialChange("website", e.target.value)
                  }
                  className="bg-transparent border border-white rounded-lg p-4 text-white focus:outline-none focus:border-[#9A62FF]"
                  placeholder="Enter Website link"
                />
              </div>
              <p className="text-white text-base font-medium">
                info: coin data cannot be changed after creation
              </p>
            </div>
          )}
        </div>
        {errors && <p className="text-red-500 text-center text-lg">{errors}</p>}
        <Dialog>
          <DialogTrigger
            className="px-3 py-4 w-full bg-[#5600AA] text-base font-normal rounded"
            onClick={(e) => {
              if (!validateForm()) {
                e.preventDefault();
              }
            }}
          >
            Create Token
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-sm font-normal">
                (optional)
              </DialogTitle>
              <DialogTitle className="text-center text-2xl font-bold">
                Choose how many <br /> [
                {tokenData.ticker ? tokenData.ticker : ""}] you want to buy
              </DialogTitle>
              <DialogDescription className="text-[#A9A8AD] text-base font-normal">
                tip: its optional but buying a small amount of coins helps
                protect your coin from snipers
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-1">
              <p className="text-end text-base font-normal">
                (--switch to {tokenData.ticker ? tokenData.ticker : ""}--)
              </p>
              <div className="flex gap-2 items-center border border-white rounded">
                <input className="flex-1 bg-transparent p-4 outline-none focus:outline-none" />
                <div className="flex items-center gap-1 p-4">
                  <Image
                    src={TaraxaLogoChain}
                    alt="Taraxa Logo Chain"
                    width={32}
                    height={32}
                  />
                  <span>TARA</span>
                </div>
              </div>
              <p className="text-base font-normal text-[#A9A8AD]">
                you receive 1000000 MIMI
              </p>
            </div>
            <button className="p-2 rounded w-full bg-[#5600AA] text-base font-normal">
              Create token
            </button>
          </DialogContent>
        </Dialog>
        <p className="text-center">
          when your coin completes its bonding curve you receive 100k TARA
        </p>
      </div>
    </section>
  );
};
