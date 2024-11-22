import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {  taraxaTestnet } from "viem/chains";
import {  http } from "wagmi";

export const web3Config = getDefaultConfig({
  appName: "Taraxafun",
  projectId: "dzdezdzedez",
  chains: [taraxaTestnet as any],
  ssr: false,
  transports : {
    [taraxaTestnet.id]: http()
  }
});
