// services/uploadService.ts
import axios from "axios";
import { servUrl } from "@/config/servUrl";

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ALLOWED_FILE_TYPES = [".png", ".jpg", ".jpeg", ".gif"];

export const uploadImage = async (image: File, jwt: string, url: string) => {
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

  try {
    await axios.post(`${servUrl}${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": jwt,
      },
    });
    return { success: true, message: "Profile picture updated successfully!" };
  } catch (err) {
    console.error("Upload error:", err);
    return {
      success: false,
      message: "Error uploading image. Please try again.",
    };
  }
};
