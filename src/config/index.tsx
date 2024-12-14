import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {  taraxaTestnet, sepolia } from "viem/chains";
import {  http } from "wagmi";
import deployerAbi from "./abi/deployerAbi.json";
import erc20Abi from "./abi/erc20Abi.json";
import poolAbi from "./abi/poolAbi.json"

export const web3Config = getDefaultConfig({
  appName: "Taraxafun",
  projectId: "dzdezdzedez",
  chains: [taraxaTestnet as any],
  ssr: false,
  transports : {
    [taraxaTestnet.id]: http("https://rpc.testnet.taraxa.io")
  }
});

export const TaraToApiUrl = "https://tara.to/api/v2"

export const taraxaContract = {
  address: "0x363Ca3F16F1Eaa97814d7718818D3d50628c0055",
  abi: erc20Abi as any,
} as const;

export const poolContract = {
  address: "0x157F24E522490802f06dbf686c66791558B3E441",
  abi: poolAbi as any,
} as const

export const deployerContract = {
  address: "0x2312627c96105fBa00E9DfF4d4791Ab795E705AA",
  abi: deployerAbi as any,
} as const;

export const funStorageContract = {
    address: "0x34dEF17d19409168C36b8dD5427C101b8b9dA8Ff",
};

export const MulticallAddress = {
  address: "0x8a573f2360eB2Ff794bc14F97B43789b51a296D7"
}