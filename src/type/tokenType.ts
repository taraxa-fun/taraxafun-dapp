export interface TokenType {
  name: string;
  symbol: string;
  description: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  supply: number;
  bondigCurve: number;
  minBuy: number;
  maxBuy: number;
  imagePath: string;
  creator: string;
  timestamp: number;
  marketCap: string;
  replies: number;
}
