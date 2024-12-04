import { Reply } from "./reply";
import { Trade } from "./trade";

export interface TokenType {
  id: number;
  name: string;
  symbol: string;
  description: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  supply: number;
  bondingCurve: number;
  minBuy: number;
  maxBuy: number;
  imagePath: string;
  creator: string;
  timestamp: number;
  marketCap: string;
  replyCount: number;
  replies: Reply[];
  trades: Trade[];
  address: string;
}
