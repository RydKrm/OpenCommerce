import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function uploadImage(file: any) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result.secure_url;
}

export default cloudinary;
