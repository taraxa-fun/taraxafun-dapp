import { readContract } from "@wagmi/core";
import { deployerContract, web3Config } from "@/config";

export const getPercentageAntiSniperBeforeBuy = async (): Promise<string> => {
    try {
        const result = await readContract(web3Config, {
            ...deployerContract,
            functionName: "antiSnipePer",
            args: [],
        }) as bigint;
        
        return result.toString();
    } catch (error) {
        console.error("Error getting anti-sniper percentage:", error);
        return "0";
    }
};