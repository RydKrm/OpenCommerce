import cloudinary from "@/config/cloudinary.config";

class ImageService {
  async uploadImage(
    file: Express.Multer.File
  ): Promise<{ sourceUrl: string; publicId: string }> {
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
              resolve({
                sourceUrl: result?.secure_url as string,
                publicId: result?.public_id as string,
              });
            }
          }
        )
        .end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result !== "ok") {
        throw new Error(`Failed to delete image: ${result.result}`);
      }
      console.log(`Image ${publicId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }
}

const imageService = new ImageService();

export default imageService;
