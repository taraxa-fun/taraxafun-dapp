import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { ProfileTab } from "@/type/profile";
import { TabNavigation } from "@/components/Profile/tabNavigation";
import { CoinsCreated } from "@/components/Profile/coinsCreated";
import { ModalProfile } from "@/components/Profile/modalProfile";
import { useDisconnect } from "wagmi";
import { useAuthStore } from "@/store/User/useAuthStore";
import { Replies } from "@/components/Profile/replies";
import { handleCopy } from "@/utils/copy";
import Link from "next/link";
import { UserProfile } from "@/type/user";

const ProfilePage: NextPage = () => {
  const { userMe, fetchUserProfile, logout } = useAuthStore();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { username } = router.query;

  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>("coins-created");
  const [loadingPage, setLoadingPage] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!username || typeof username !== "string") return;

      setLoadingPage(true);

      try {
        const userProfile =
          userMe && userMe.user.username === username
            ? userMe
            : await fetchUserProfile(username);

        setProfileData(userProfile || null);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setProfileData(null);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchData();
  }, [username, userMe, fetchUserProfile]);

  if (loadingPage) {
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

  const isOwnProfile = userMe?.user.username === profileData.user.username;

  const renderTabContent = () => {
    switch (activeTab) {
      case "coins-created":
        return (
          <CoinsCreated
            coins={profileData.tokens || []}
            username={profileData.user.username}
            isLoading={loadingPage}
          />
        );
      case "replies":
        return (
          <Replies
            replies={profileData.comments || []}
            username={profileData.user.username}
          />
        );
      default:
        return (
          <CoinsCreated
            coins={profileData.tokens || []}
            username={profileData.user.username}
            isLoading={loadingPage}
          />
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
      <div className="mb-4 text-start items-start d-flex px-4">
        <Link href="/">(go back)</Link>
      </div>
      <div className="pb-6">
        {profileData.user.avatar && (
          <Image
            src={profileData.user.avatar}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
      </div>
      <div className="space-y-2 text-center">
        <h3 className="font-bold text-xl">@{profileData.user.username}</h3>
        <p className="text-gray-300 font-normal text-sm max-w-md mx-auto">
          {profileData.user.description || "No description"}
        </p>

        {isOwnProfile && (
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
          {profileData.user.likes || 0} likes received
        </p>
        <div className="flex flex-col gap-2 max-w-fit mx-auto">
          <span className="text-sm font-normal border rounded border-gray-300 text-gray-300 p-2.5 bg-transparent text-center max-w-fit">
            {profileData.user.wallet}
          </span>
          <div className="flex justify-between w-full">
            <a
              href={`https://etherscan.io/address/${profileData.user.wallet}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-normal hover:text-[#9A62FF] cursor-pointer"
            >
              view on etherscan
            </a>
            <p
              className="text-xs font-normal hover:text-[#9A62FF] cursor-pointer"
              onClick={() => handleCopy(profileData.user.wallet, setCopied)}
            >
              {copied ? "copied" : "copy address"}
            </p>
          </div>
        </div>
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </section>
  );
};

export default ProfilePage;
