import { deployerContract, poolContract, web3Config } from "@/config";
import { parseEther, parseGwei } from "viem";
import { multicall, waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from "react";

interface PoolData {
 reserveTokens: bigint;
 reserveETH: bigint;
 volume: bigint;
 listThreshold: bigint;
 initialReserveEth: bigint;
 maxBuyPerWallet: bigint;
 tradeActive: boolean;
 royalemitted: boolean;
}

interface FunTokenPool {
 creator: `0x${string}`;
 token: `0x${string}`;
 baseToken: `0x${string}`;
 router: `0x${string}`;
 lockerAddress: `0x${string}`;
 storedLPAddress: `0x${string}`;
 deployer: `0x${string}`;
 pool: PoolData;
}

interface PoolState {
 poolData: FunTokenPool;
 isLoading: boolean;
 error: string | null;
}

export const usePool = (
 address: `0x${string}`,
 refresh?: unknown,
 update?: unknown
) => {
 const [data, setData] = useState<PoolState>({
   poolData: {
     creator: '0x' as `0x${string}`,
     token: '0x' as `0x${string}`,
     baseToken: '0x' as `0x${string}`,
     router: '0x' as `0x${string}`,
     lockerAddress: '0x' as `0x${string}`,
     storedLPAddress: '0x' as `0x${string}`,
     deployer: '0x' as `0x${string}`,
     pool: {
       reserveTokens: BigInt(0),
       reserveETH: BigInt(0),
       volume: BigInt(0),
       listThreshold: BigInt(0),
       initialReserveEth: BigInt(0),
       maxBuyPerWallet: BigInt(0),
       tradeActive: false,
       royalemitted: false
     }
   },
   isLoading: true,
   error: null
 });

useEffect(() => {
    const fetch = async () => {
      try {
        const res = await multicall(web3Config, {
          contracts: [
            {
              ...poolContract,
              functionName: "tokenPools",
              args: [address],
            },
          ],
        });
  
        const result = res[0].result as any;
        setData({
          poolData: {
            creator: result[0],
            token: result[1],
            baseToken: result[2],
            router: result[3],
            lockerAddress: result[4],
            storedLPAddress: result[5],
            deployer: result[6],
            pool: {
              reserveTokens: result[7].reserveTokens,
              reserveETH: result[7].reserveETH,
              volume: result[7].volume,
              listThreshold: result[7].listThreshold,
              initialReserveEth: result[7].initialReserveEth,
              maxBuyPerWallet: result[7].maxBuyPerWallet,
              tradeActive: result[7].tradeActive,
              royalemitted: result[7].royalemitted
            }
          },
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error("Error details:", error);
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch pool data'
        }));
      }
    };
  
    if (address) {
      fetch();
    }
  }, [address, refresh, update]);

 return data;
};