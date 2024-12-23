import cloudinary from "@/config/cloudinary.config";

class ImageService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "product",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              reject(new Error(error.message));
            } else {
              resolve(result?.secure_url as string);
            }
          }
        )
        .end(file.buffer);
    });
  }
}

const imageService = new ImageService();

export default imageService;
