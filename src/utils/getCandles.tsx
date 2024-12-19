import axios from 'axios';
import { servUrl } from '@/config/servUrl';
import { EmperorToken } from '@/type/PumpEmpror/PumpEmperorType';




export const getCandles = async (address: string) => {
 try {
   const response = await axios.get(`${servUrl}/candle/all/${address}`, {
     headers: {
       'Content-Type': 'application/json'
     }
   });

   return response.data;
 } catch (error) {

   return error;
 }
};