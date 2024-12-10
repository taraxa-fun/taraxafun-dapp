import { servUrl } from "@/config/servUrl";
import axios from "axios";

export const createReply = async (
  jwt: string,
  tokenAddress: string,
  content: string
): Promise<boolean> => {
  try {
    if (!jwt) {
     console.error("User is not authenticated. Missing JWT.");
    }

    const response = await axios.post(
      `${servUrl}/comment/create`,
      {
        tokenAddress,
        content,
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
    console.error("Error creating reply:", error);
    return false;
  }
};
