import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi"; // Import the balance hook
import Image from "next/image";
import logoPlaceHolder from "../../assets/logo/taraxafunLogo.png";
import Link from "next/link";
import { web3Config } from "@/config";
import { sepolia } from "viem/chains";

interface CustomBtnAppProps {
  className?: string;
}

export const CustomBtnApp: React.FC<CustomBtnAppProps> = ({ className }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
          address: account?.address as any,
          chainId: sepolia.id,
        });

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className={` flex items-center justify-center whitespace-nowrap  ${className}`}
                    onClick={openConnectModal}
                    type="button"
                  >
                    <span>(Connect Wallet)</span>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className={` whitespace-nowrap ${className}`}
                    onClick={openChainModal}
                    type="button"
                  >
                    <span className="">Wrong network</span>
                  </button>
                );
              }
              return (
                <Link href={`/profile/0xPumper_001`}>
                  <div className="p-1 w-full bg-transparent border border-white text-xs font-normal rounded flex items-center">
                    <div className="w-4 h-4 rounded-full overflow-hidden mr-2">
                      <Image
                        src={logoPlaceHolder}
                        alt="Placeholder"
                        width={16}
                        height={16}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>
                      0xPumper_001{" "}
                      {isBalanceLoading
                        ? "Loading..."
                        : `${parseFloat(balanceData?.formatted || "0").toFixed(4)} ETH`}
                    </span>
                  </div>
                </Link>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
