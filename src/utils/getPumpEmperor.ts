import axios from 'axios';
import { servUrl } from '@/config/servUrl';
import { UserComment } from '@/type/user';


// type/EmperorToken.ts

interface TokenUser {
  _id: string;
  username: string;
  wallet: string;
  avatar?: string;
}

interface TokenDetails {
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
  token: TokenDetails;
}

export const getPumpEmperor = async (): Promise<EmperorToken> => {
  "appel de l'api pour récupérer le token du pump emperor"
 try {
   const response = await axios.get<EmperorToken>(`${servUrl}/token/emperor/last`, {
     headers: {
       'Content-Type': 'application/json'
     }
   });

   return response.data;
 } catch (error) {
   console.error('Error fetching pump emperor token:', error);
   throw error;
 }
};