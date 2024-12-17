// type/EmperorToken.ts

interface TokenUser {
    _id: string;
    username: string;
    wallet: string;
    avatar?: string;
  }
  
  interface TokenDetailsPumpEmperor {
    _id: string;
    address: string;
    description: string;
    marketcap: string;
    name: string;
    supply: string;
    symbol: string;
    telegram: string;
    twitter: string;
    website: string;
    image: string;
    user: TokenUser;
  }
  
  export interface EmperorToken {
    _id: string;
    token_address: string;
    total_volume: string;
    created_at: string;
    token: TokenDetailsPumpEmperor;
  }