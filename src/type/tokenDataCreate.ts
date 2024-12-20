export interface TokenData {
  _name: string;
  _symbol: string;
  _data: string;
  _totalSupply: string;
  _liquidityTARAAmount: string;
  _antiSnipe: boolean;
  _amountAntiSnipe: string;
  _maxBuyPerWallet: string;
  image?: File | null;
  bondingCurveType?: string;
  socialLinks: {
    twitter: string;
    telegram: string;
    website: string;
  };
}
