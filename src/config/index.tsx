import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {  sepolia } from "viem/chains";
import {  http } from "wagmi";
import deployerAbi from "./abi/deployerAbi.json";
import erc20Abi from "./abi/erc20Abi.json";
import poolAbi from "./abi/poolAbi.json"

export const web3Config = getDefaultConfig({
  appName: "Taraxafun",
  projectId: "dzdezdzedez",
  chains: [sepolia as any],
  ssr: false,
  transports : {
    [sepolia.id]: http()
  }
});

export const taraxaContract = {
  address: "0x363Ca3F16F1Eaa97814d7718818D3d50628c0055",
  abi: erc20Abi as any,
} as const;

export const poolContract = {
  address: "0x1207F60d12cA5BF8A943A1Ba700E4d9340F659f9",
  abi: poolAbi as any,
} as const

export const deployerContract = {
  address: "0xC4967B6F11546AB72F8A61cC25B896a03b93764a",
  abi: deployerAbi as any,
} as const;

export const funStorageContract = {
    address: "0xC871CD7F02606ac8Fb079174AeE6c59323CCBc4D",

};