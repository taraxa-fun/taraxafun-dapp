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
  address: "0xd1d0834b7Fa41515f93a3a3625411dA23b3CeF02",
  abi: poolAbi as any,
} as const

export const deployerContract = {
  address: "0xd2aeEEC9732787dD47d825782C23ef8d156BD021",
  abi: deployerAbi as any,
} as const;

export const funStorageContract = {
    address: "0x2d45F592b1f6D988A523d4A0BDb16f2f8F62d7A2",
};

{/*
export const MulticallAddress = {
  address: "0x8a573f2360eB2Ff794bc14F97B43789b51a296D7"
}
  * */}