import { poolContract, web3Config } from "@/config";
import {
  readContract,
} from "@wagmi/core";
import { useEffect, useState } from "react";

interface PoolData {
  reserveTokens: bigint;
  reserveTARA: bigint;
  volume: bigint;
  listThreshold: bigint;
  initialReserveTARA: bigint;
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
      creator: "0x" as `0x${string}`,
      token: "0x" as `0x${string}`,
      baseToken: "0x" as `0x${string}`,
      router: "0x" as `0x${string}`,
      lockerAddress: "0x" as `0x${string}`,
      storedLPAddress: "0x" as `0x${string}`,
      deployer: "0x" as `0x${string}`,
      pool: {
        reserveTokens: BigInt(0),
        reserveTARA: BigInt(0),
        volume: BigInt(0),
        listThreshold: BigInt(0),
        initialReserveTARA: BigInt(0),
        maxBuyPerWallet: BigInt(0),
        tradeActive: false,
        royalemitted: false,
      },
    },
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = (await readContract(web3Config, {
          ...poolContract,
          functionName: "tokenPools",
          args: [address],
        })) as any;
        const result = res as any;
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
              reserveTARA: result[7].reserveTARA,
              volume: result[7].volume,
              listThreshold: result[7].listThreshold,
              initialReserveTARA: result[7].initialReserveTARA,
              maxBuyPerWallet: result[7].maxBuyPerWallet,
              tradeActive: result[7].tradeActive,
              royalemitted: result[7].royalemitted,
            },
          },
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to fetch pool data",
        }));
      }
    };

    if (address) {
      fetch();
    }
  }, [address, refresh, update]);

  return data;
};
