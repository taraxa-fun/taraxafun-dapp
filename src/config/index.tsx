import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "viem/chains";
import { http } from "wagmi";
import deployerAbi from "./abi/deployerAbi.json";
import poolAbi from "./abi/poolAbi.json";
import dotenv from "dotenv";
dotenv.config();


export const web3Config = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME_FOR_RAIMBOW || "DefaultAppName",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FOR_RAIMBOWKIT || "defaultProjectId",
  chains: [baseSepolia as any],
  ssr: false,
  transports: {
    [baseSepolia.id]: http(),
  },
});

export const TaraToApiUrl = process.env.NEXT_PUBLIC_TARA_TO_API_URL;

export const poolContract = {
  address: process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDRESS as `0x${string}`,
  abi: poolAbi as any,
} as const;

export const deployerContract = {
  address: process.env.NEXT_PUBLIC_DEPLOYER_CONTRACT_ADDRESS as `0x${string}`,
  abi: deployerAbi as any,
} as const;

