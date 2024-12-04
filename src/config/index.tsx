import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {  sepolia } from "viem/chains";
import {  http } from "wagmi";
import deployerAbi from "./abi/deployerAbi.json";

export const web3Config = getDefaultConfig({
  appName: "Taraxafun",
  projectId: "dzdezdzedez",
  chains: [sepolia as any],
  ssr: false,
  transports : {
    [sepolia.id]: http()
  }
});

export const deployerContract = {
  address: "0xC4967B6F11546AB72F8A61cC25B896a03b93764a",
  abi: deployerAbi as any,
} as const;