import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar/navbar";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import logoPlaceHolder from "../../assets/logo/taraxafunLogo.png";
import { ProfileTab } from "@/type/profile";
import { CoinsHeld } from "@/components/Profile/coinsHeld";
import { TabNavigation } from "@/components/Profile/tabNavigation";
import { CoinsCreated } from "@/components/Profile/coinsCreated";
import { ModalProfile } from "@/components/Profile/modalProfile";
import { useDisconnect } from "wagmi";
import { useAuthStore } from "@/store/User/useAuthStore";
import { Replies } from "@/components/Profile/replies";
import { handleCopy } from "@/utils/copy";

const ProfilePage: NextPage = () => {
  const { userMe, fetchUserProfile, logout, isProfileUpdating, loading } =
    useAuthStore();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { username } = router.query;
  const [copied, isCopied] = useState(false);
  const [profileData, setProfileData] = useState(userMe || null);
  const [activeTab, setActiveTab] = useState<ProfileTab>("coins-held");
  const [loadingPage, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!username || typeof username !== "string") return;
      setLoading(true);
      if (userMe && userMe.user.username === username) {
        console.log(`Affichage de userMe pour ${username}`);
        setProfileData(userMe);
        setLoading(false);
        return;
      }
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          console.log(`Affichage de userProfile pour ${username}`);
          setProfileData(userProfile);
        } else {
          setProfileData(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, userMe, fetchUserProfile, isProfileUpdating]);

  if (!username || loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  if (!profileData) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p>User not found.</p>
      </section>
    );
  }
  const renderTabContent = () => {
    switch (activeTab) {
      case "coins-created":
        return (
          <CoinsCreated coins={profileData.tokens || []} isLoading={loading} />
        );
      case "replies":
        return <Replies replies={profileData.comments || []} />;
      default:
        return (
          <CoinsCreated coins={profileData.tokens || []} isLoading={loading} />
        );
    }
  };

  const handleDisconnect = () => {
    disconnect();
    logout();
    router.push("/");
  };

  return (
    <section className="pt-32 lg:w-6/12 w-12/12 md:w-8/12 flex flex-col items-center justify-center mx-auto">
      <Navbar />
      <div className="pb-6">
        {userMe?.user.avatar && (
          <Image
            src={userMe.user.avatar}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
      </div>
      <div className="space-y-2 text-center">
        <h3 className="font-bold text-xl">@{profileData.user.username}</h3> 
        {/** 
        <p className="text-gray-300 font-normal text-sm max-w-md mx-auto">
          {userMe?.user.description || "No description"}
        </p>
        */}

        {userMe?.user.username === username && (
          <>
            <ModalProfile
              trigger={
                <p className="font-semibold text-sm">(--- edit profile ---)</p>
              }
            />
            <button
              className="font-semibold text-sm"
              onClick={handleDisconnect}
            >
              (--- disconnect wallet ---)
            </button>
          </>
        )}
        <p className="text-lg font-medium mb-4">
          {userMe?.user.likes} ??? likes received |{" "}
        </p>
        <div className="flex flex-col gap-2 max-w-fit mx-auto">
          <span className="text-sm font-normal border rounded border-gray-300 text-gray-300 p-2.5 bg-transparent text-center max-w-fit">
            {userMe?.user.wallet ? userMe?.user.wallet : ""}
          </span>
          <div className="flex justify-between w-full">
            {userMe?.user.wallet && (
              <>
                <a
                  href={`https://etherscan.io/address/${userMe?.user.wallet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-normal hover:text-[#9A62FF] cursor-pointer"
                >
                  view on etherscan
                </a>
                <p
                  className="text-xs font-normal hover:text-[#9A62FF] cursor-pointer"
                  onClick={() => handleCopy(userMe?.user.wallet, isCopied)}
                >
                  {copied ? "copied" : "copy address"}
                </p>
              </>
            )}
          </div>
        </div>
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </section>
  );
};

export default ProfilePage;
