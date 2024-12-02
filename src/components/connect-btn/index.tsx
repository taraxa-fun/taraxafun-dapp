import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModalProfile } from "../Profile/modalProfile";
import Image from "next/image";
import logoPlaceHolder from "../../assets/logo/taraxafunLogo.png";

interface CustomBtnAppProps {
  className?: string;
}

export const CustomBtnApp: React.FC<CustomBtnAppProps> = ({ className }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
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
                <ModalProfile
                  trigger={
                    <div  className="p-1 w-full bg-transparent border border-white text-xs font-normal rounded flex items-center">
               
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
                  </div>
                  }
                />
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
