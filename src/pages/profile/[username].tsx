import { useState } from "react";
import { Navbar } from "@/components/Navbar/navbar";
import { NextPage } from "next";
import { useRouter } from "next/router";
import logoPlaceHolder from "../../assets/logo/taraxafunLogo.png";
import Image from "next/image";
import { ProfileTab } from "@/type/profile";
import { CoinsHeld } from "@/components/Profile/coinsHeld";
import { TabNavigation } from "@/components/Profile/tabNavigation";
import { usersData } from "@/data/userData";
import { handleCopy } from "@/utils/copy";
import { CoinsCreated } from "@/components/Profile/coinsCreated";
import { Replies } from "@/components/Profile/replies";
import { ModalProfile } from "@/components/Profile/modalProfile";
import { useDisconnect } from "wagmi";

const ProfilePage: NextPage = () => {
  const { disconnect } = useDisconnect(); 
  const router = useRouter();
  const { username } = router.query;
  const [activeTab, setActiveTab] = useState<ProfileTab>("coins-held");
  const [copied, isCopied] = useState(false);

  const user = usersData.find((u) => u.username === username);
  if (!user && router.isReady) {
    router.push("/");
    return null;
  }
  const renderTabContent = () => {
    if (!user) return null;

    switch (activeTab) {
      case "coins-held":
        return <CoinsHeld coins={user.coinsHeld} />;
      case "coins-created":
        return <CoinsCreated coins={user.coinsCreated} />;
      case "replies":
        return <Replies replies={user.replies} />;
      default:
        return <CoinsHeld coins={user.coinsHeld} />;
    }
  };

  if (!user) return null;

  return (
    <section className="pt-32 lg:w-6/12 w-12/12 md:w-8/12 flex flex-col items-center justify-center mx-auto">
      <Navbar />
      <div className="pb-6">
        <Image src={logoPlaceHolder} alt="placholder" />
      </div>
      <div className="space-y-2 text-center">
        <h3 className="font-bold text-xl">@{user.username}</h3>
        <p className="text-gray-300 font-normal text-sm max-w-md mx-auto">
          {user.description}
        </p>

        <ModalProfile
          trigger={
            <p className="font-semibold text-sm">(--- edit profile ---)</p>
          }
        />
             <button
                    className="p-1 bg-red-500 text-white rounded text-xs font-normal"
                    onClick={() => disconnect()}
                  >
                    Logout
                  </button>
        <p className="text-lg font-medium mb-4">
          {user.followers} followers | {user.likesReceived} likes received |{" "}
          {user.mentionsReceived} mentions received
        </p>
        <div className="flex flex-col gap-2 max-w-fit mx-auto">
          <span className="text-sm font-normal border rounded border-gray-300 text-gray-300 p-2.5 bg-transparent text-center max-w-fit">
            {user.wallet ? user.wallet : ""}
          </span>
          <div className="flex justify-between w-full">
            {user.wallet && (
              <>
                <a
                  href={`https://etherscan.io/address/${user.wallet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-normal hover:text-[#9A62FF] cursor-pointer"
                >
                  view on etherscan
                </a>
                <p
                  className="text-xs font-normal hover:text-[#9A62FF] cursor-pointer"
                  onClick={() => handleCopy(user.wallet, isCopied)}
                >
                  {copied ? "copied" : "copy address"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
    </section>
  );
};

export default ProfilePage;



