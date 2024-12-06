import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {  bscTestnet, sepolia } from "viem/chains";
import {  http } from "wagmi";
import deployerAbi from "./abi/deployerAbi.json";
import erc20Abi from "./abi/erc20Abi.json";
import poolAbi from "./abi/poolAbi.json"

export const web3Config = getDefaultConfig({
  appName: "Taraxafun",
  projectId: "dzdezdzedez",
  chains: [bscTestnet as any],
  ssr: false,
  transports : {
    [bscTestnet.id]: http()
  }
});

export const taraxaContract = {
  address: "0x363Ca3F16F1Eaa97814d7718818D3d50628c0055",
  abi: erc20Abi as any,
} as const;

export const poolContract = {
  address: "0xb714D168D7737DDC12F75d227da00FcF158c5dAF",
  abi: poolAbi as any,
} as const

export const deployerContract = {
  address: "0xbD12Ba1114c1d72A362FC34c4b738B80ce398737",
  abi: deployerAbi as any,
} as const;

export const funStorageContract = {
    address: "0xC871CD7F02606ac8Fb079174AeE6c59323CCBc4D",

};