import { servUrl } from "@/config/servUrl";
import axios from "axios";

export const saveTokenToDatabase = async (
  jwt: string,
  tokenAddress: string,
  twitter?: string,
  telegram?: string,
  website?: string
) => {
  try {
    if (!jwt) {
      console.error("User is not authenticated. Missing JWT.");
      return false;
    }
    await axios.post(
      `${servUrl}/token/create`,
      {
        address: tokenAddress.toLocaleLowerCase(),
        twitter: twitter || "",
        telegram: telegram || "",
        website: website || "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": jwt,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Error saving token to database:", error);
    return error;
  }
};
