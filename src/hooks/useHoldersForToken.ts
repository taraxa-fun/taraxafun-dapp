import { useEffect, useState } from "react";
import axios from "axios";
import { servUrl } from "@/config/servUrl";
import { TaraToApiUrl } from "@/config";

interface Holder {
    address: {
      hash: string;
      ens_domain_name: string | null;
      is_contract: boolean;
      is_scam: boolean;
      is_verified: boolean;
    };
    token: {
      total_supply: string; 
    };
    value: string;
  }
  

export const useHoldersForToken = (address: `0x${string}`, update: number) => {
    const [holders, setHolders] = useState<Holder[]>([]); 
    const [holdersIsLoading, setHoldersIsLoading] = useState(false);
    const [holdersError, setHoldersError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchHolders = async () => {
        setHoldersIsLoading(true);
        setHoldersError(null);
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_TARA_TO_API_URL}/tokens/0x712037beab9a29216650b8d032b4d9a59af8ad6c/holders`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data?.items) {
            setHolders(response.data.items);
          } else {
            setHolders([]);
          }
        } catch (err) {
          setHoldersError("Failed to fetch holders.");
        } finally {
          setHoldersIsLoading(false);
        }
      };
  
      fetchHolders();
    }, [address, update]);
  
    return { holders, holdersIsLoading, holdersError };
  };
  
