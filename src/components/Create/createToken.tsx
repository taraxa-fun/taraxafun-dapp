import { useState } from "react";
import { toast } from "react-toastify";
interface TokenData {
  name: string;
  ticker: string;
  description: string;
  image: File | null;
  initialSupply: string;
  bondingCurve: string;
  maxBuy: string;
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
    socialLinks: {
      twitter: "",
      telegram: "",
      website: "",
    },
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  type TokenKey = keyof typeof tokenData;
  type SocialKey = keyof typeof tokenData.socialLinks;

  const handleInputChange = (key: TokenKey, value: string) => {
    setTokenData((prev) => ({ ...prev, [key]: value }));
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
    <section className="pt-32 pb-20 lg:w-6/12 w-12/12 md:w-8/12 mx-auto max-w-lg">
<div className="relative w-full mb-8">
  {/* Go Back */}
  <p className="font-semibold text-md cursor-pointer absolute left-0 top-1/2 -translate-y-1/2">
    (go back)
  </p>
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
          <label className="text-[#9A62FF] text-base font-medium">Image</label>
          <div className="relative border flex-col space-y-2 border-white rounded-lg p-4 flex items-center justify-between">
            {tokenData.image ? (
              <>
                <p className="text-white text-sm font-medium">
                  Selected file: {tokenData.image.name}
                </p>
                <button
                  onClick={() => handleFileChange(null)}
                  className="bg-[#9A62FF] text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </>
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
        <button
          onClick={handleSubmit}
          className="px-3 py-4 w-full bg-[#5600AA] text-base font-normal"
        >
          Create Token
        </button>
        <p className="text-center">
          when your coin completes its bonding curve you receive 100k TARA
        </p>
      </div>
    </section>
  );
};
