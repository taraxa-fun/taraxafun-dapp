import axios from 'axios';
import { TokenType } from '@/type/tokenType';
import { servUrl } from '@/config/servUrl';

export const getPumpEmperor = async (): Promise<TokenType> => {
 try {
   const response = await axios.get<TokenType>(`${servUrl}/token/emperor/last`, {
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