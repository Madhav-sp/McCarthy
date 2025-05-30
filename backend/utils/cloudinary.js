import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a file to Cloudinary and optionally delete the old one
 * @param {string} localFilePath - The local path to the image file
 * @param {string} [oldPublicId] - Optional Cloudinary public ID of the old image to delete
 */
const uploadCloudinary = async (localFilePath, oldPublicId = null) => {
  try {
    if (!localFilePath) return null;

    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
        console.log("Old image deleted successfully");
      } catch (err) {
        console.warn("Failed to delete old image:", err.message);
      }
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    console.log("File uploaded successfully!");
    fs.unlinkSync(localFilePath); 
    return response;
  } catch (error) {
    console.error("Upload error:", error.message);
    fs.unlinkSync(localFilePath); 
    return null;
  }
};

export { uploadCloudinary };
