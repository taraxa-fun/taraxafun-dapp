import axios from "axios";
import { servUrl } from "@/config/servUrl";
import { EmperorToken } from "@/type/PumpEmpror/PumpEmperorType";

export const getPumpEmperor = async (): Promise<EmperorToken> => {
  "appel de l'api pour récupérer le token du pump emperor";
  try {
    const response = await axios.get<EmperorToken>(
      `${servUrl}/token/emperor/last`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching pump emperor token:", error);
    throw error;
  }
};
