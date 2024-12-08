export interface UserToken {
    _id: string;
    address: string;
    created_at: string;
    description: string;
    name: string;
    supply: string;
    symbol: string;
    user: string;
    telegram?: string;
    twitter?: string;
    website?: string;
  }
  
  export interface UserComment {
    _id: string;
    content: string;
    likes: number;
    user: string;
    author: string;
    created_at: string;
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
    };
    comments: UserComment[];
    tokens: UserToken[];
    trades: any[];
    commentsStats: {
      count: string
      likes: string
    }
  }