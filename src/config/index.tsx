import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {  taraxaTestnet, sepolia, baseSepolia } from "viem/chains";
import {  http } from "wagmi";
import deployerAbi from "./abi/deployerAbi.json";
import erc20Abi from "./abi/erc20Abi.json";
import poolAbi from "./abi/poolAbi.json"

export const web3Config = getDefaultConfig({
  appName: "Taraxafun",
  projectId: "dzdezdzedez",
  chains: [baseSepolia as any],
  ssr: false,
  transports : {
    [baseSepolia.id]: http()
  }
});

export const TaraToApiUrl = "https://tara.to/api/v2"

export const taraxaContract = {
  address: "0x363Ca3F16F1Eaa97814d7718818D3d50628c0055",
  abi: erc20Abi as any,
} as const;

export const poolContract = {
  address: "0x82353a6D85E691c9b434f239eb5180db73a14231",
  abi: poolAbi as any,
} as const

export const deployerContract = {
  address: "0x1DD294370D8856732BB3dDF9a4874e84f77A1b51",
  abi: deployerAbi as any,
} as const;

export const funStorageContract = {
    address: "0x93c3869324b07095D37a92A37154BA95AB2503b3",
};

{/*
export const MulticallAddress = {
  address: "0x8a573f2360eB2Ff794bc14F97B43789b51a296D7"
}
  * */}