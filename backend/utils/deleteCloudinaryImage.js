import cloudinary from "../config/cloudinary.js";

const deleteCloudinaryImage = async (publicId) => {

  if (!publicId) return;

  try {

    await cloudinary.uploader.destroy(publicId);

  } catch (error) {

    console.error("Cloudinary Delete Error:", error.message);

  }

};

export default deleteCloudinaryImage;