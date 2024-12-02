import { Reply } from "./reply";
import { TokenType } from "./tokenType";


export interface UserType {
  id: string;
  wallet: string;
  username: string;
  avatarPath: string;
  likeCount: number;
  description: string;
  followers: number;
  likesReceived: number;
  mentionsReceived: number;
  coinsHeld: { symbol: string; amount: string }[];
  coinsCreated: TokenType[]; 
  replies: Reply[]; 
}
