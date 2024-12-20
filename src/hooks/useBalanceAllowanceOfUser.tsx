import { multicall } from "@wagmi/core";
import { useState, useEffect } from "react";
import { poolContract, web3Config } from "@/config";
import { erc20Abi } from "viem";

export const useBalanceAllowanceOfUser = (
  tokenAddress: `0x${string}`,
  accountAddress: `0x${string}`,
  update: any
) => {
  const [data, setData] = useState<{
    balanceOfUser: bigint | null;
    allowanceOfUser: bigint | null;
  }>({
    balanceOfUser: null,
    allowanceOfUser: null,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await multicall(web3Config, {
          contracts: [
            {
              address: tokenAddress,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [accountAddress],
            },
            {
              address: tokenAddress,
              abi: erc20Abi,
              functionName: "allowance",
              args: [accountAddress, poolContract.address],
            },
          ],
        });

        setData({
          balanceOfUser: results[0]?.result as bigint,
          allowanceOfUser: results[1]?.result as bigint,
        });
      } catch (err: any) {
        setError("Failed to fetch token details");
        setData({ balanceOfUser: null, allowanceOfUser: null });
      } finally {
        setLoading(false);
      }
    };

    if (tokenAddress && accountAddress ) {
      fetchDetails();
    }
  }, [tokenAddress, accountAddress, update]);

  return { ...data, loading, error };
};
