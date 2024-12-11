import { useEffect, useState } from "react";
import axios from "axios";
import { servUrl } from "@/config/servUrl";

interface Trade {
  _id: string;
  type: "buy" | "sell";
  outAmount: string;
  inAmount: string;
  hash: string;
  created_at: string;
  user: {
    _id: string;
    wallet: string;
  };
  token: {
    _id: string;
    address: string;
    symbol: string;
  };
}

interface UseLastTradesResult {
  trades: Trade[];
  isLoading: boolean;
  error: string | null;
}

export const useLastTrades = (): UseLastTradesResult => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastTrades = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${servUrl}/trade/last`, {
          params: { limit: 5 },
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.data) {
          setTrades(response.data.data);

        } else {
          setTrades([]);
        }
      } catch (err) {
        console.error("Error fetching last trades:", err);
        setError("Failed to fetch last trades.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastTrades();
  }, []);

  return { trades, isLoading, error };
};
