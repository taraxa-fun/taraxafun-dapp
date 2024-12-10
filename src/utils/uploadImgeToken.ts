import axios from "axios";
import { servUrl } from "@/config/servUrl";

const MAX_FILE_SIZE = 500 * 1024;
const ALLOWED_FILE_TYPES = [".png", ".jpg", ".jpeg", ".gif"];

export const uploadImageToken = async (
  image: File,
  jwt: string,
  tokenAddress: string
) => {
  if (image.size > MAX_FILE_SIZE) {
    return {
      success: false,
      message: "Image size must be less than 500KB",
    };
  }

  const fileExtension = image.name
    .toLowerCase()
    .substring(image.name.lastIndexOf("."));
  if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
    return {
      success: false,
      message: "Image must be in PNG, JPG, JPEG or GIF format",
    };
  }

  const formData = new FormData();
  formData.append("image", image);
  formData.append("address", tokenAddress.toLowerCase());

  try {
    await axios.post(`${servUrl}/token/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": jwt,
      },
    });
    return { success: true, message: "Token image uploaded successfully!" };
  } catch (err) {
    console.error("Upload error:", err);
    return {
      success: false,
      message: "Error uploading token image. Please try again.",
    };
  }
};
