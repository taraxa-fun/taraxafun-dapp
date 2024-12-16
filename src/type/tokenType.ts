interface Creator {
  _id: string;
  username: string;
  avatar?: string;
}

export interface TokenType {
  _id: string;
  name?: string;
  symbol?: string;
  image?: string;
  description?: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  supply?: string;
  address: `0x${string}`;
  created_at: string;
  marketcap?: string;
  replies_count?: number;
  listed: boolean;
  pair_address: string;
  user: Creator;
}

export interface TokenCreatedProfile {
  _id: string;
  address: `0x${string}`;
  __v: string;
  created_at: string;
  description: string;
  name: string;
  supply: string;
  symbol: string;
  user: string;
}

// Interface pour la réponse de l'API
export interface TokenResponse {
  success: boolean;
  data: {
    tokens: TokenType[];
    pagination: {
      total: number;
      currentPage: number;
      totalPages: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}
