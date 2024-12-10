export interface TradeUser {
    _id: string;
    wallet: `0x${string}`;
    username: string;
  }
  
  export interface TradeToken {
    _id: string;
    address: `0x${string}`;
    marketcap: string;
    symbol: string;
  }
  
  export interface TradeData {
    _id: string;
    type: 'buy' | 'sell';
    outAmount: string;
    inAmount: string;
    index: string;
    hash: `0x${string}`;
    user: TradeUser;
    token: TradeToken;
    created_at: string;
    __v: number;
  }
  
  export interface TradeMessage {
    data: TradeData;
  }
  
  export type Trades = TradeMessage[];