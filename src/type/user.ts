export interface UserToken {
    user: UserProfile;
    _id: string;
    address: string;
    created_at: string;
    description: string;
    name: string;
    supply: string;
    symbol: string;
    telegram?: string;
    twitter?: string;
    website?: string;
    image?: string;
  }
  
  export interface UserComment {
    _id: string;
    content: string;
    likes: number;
    created_at: string;
    token_address: `0x${string}`;
  }
  
  export interface UserProfile {
    user: {
      _id: string;
      wallet: `0x${string}`;
      username: string;
      nonce: string;
      created_at: string;
      updated_at: string;
      avatar?: string;
      likes: number;
      description ?:string;
    };
    comments: UserComment[];
    tokens: UserToken[];
    trades: any[];
  }