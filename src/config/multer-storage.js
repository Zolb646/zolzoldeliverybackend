import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "zolzol_delivery_images", // folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const upload = multer({ storage });
