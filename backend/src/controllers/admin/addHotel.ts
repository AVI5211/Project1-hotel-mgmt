import { Request as ExpressRequest, Response } from "express";
import { prisma } from "../../utils/Prisma";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

interface RequestWithFile extends ExpressRequest {
  file?: Express.Multer.File;
}

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

export const addHotel = async (req: RequestWithFile, res: Response) => {
  const { name, location, features } = req.body;
  const parsedFeatures = JSON.parse(features);
  if (!req.file) {
    return res.status(400).json({ msg: "Hotel image is required" });
  }

  try {
    let hotelImageUrl: string;

    // Use Cloudinary if configured, otherwise use local storage
    if (isCloudinaryConfigured()) {
      console.log("Uploading to Cloudinary...");
      const cloudinaryUpload = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "hotel_images" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        fs.createReadStream(req.file!.path).pipe(uploadStream);
      });

      hotelImageUrl = (cloudinaryUpload as any).secure_url;

      // Delete temp file after uploading to Cloudinary
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting temp file:", err);
        }
      });
    } else {
      // Local storage: use relative path for URL
      console.log("Using local storage for images...");
      hotelImageUrl = `/uploads/${req.file.filename}`;
      console.log(`Image saved locally: ${hotelImageUrl}`);
    }

    const newHotel = await prisma.hotel.create({
      data: {
        name,
        location,
        features: parsedFeatures,
        hotelImage: hotelImageUrl,
      },
    });

    return res
      .status(202)
      .json({ msg: "Hotel created successfully", hotelDetails: newHotel });
  } catch (error) {
    console.error("Error creating hotel:", error);
    return res.status(500).json({
      msg: "An error occurred while creating the hotel",
    });
  }
};
