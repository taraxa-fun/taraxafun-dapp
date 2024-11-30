import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModalProfile } from "../Profile/modalProfile";

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
               <ModalProfile/>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
