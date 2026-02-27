import { Request, Response } from "express";
import { prisma } from "../../utils/Prisma";
import { Locations } from "@prisma/client";

export const getHotelByLocation = async (req: Request, res: Response) => {
  const location = req.query.location as string;

  try {
    if (
      !location ||
      !Object.values(Locations).includes(location as Locations)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid location provided",
      });
    }

    const findHotels = await prisma.hotel.findMany({
      where: {
        location: location as Locations,
      },
    });

    if (findHotels.length > 0) {
      res.status(200).json({
        success: true,
        message: "Hotels found successfully",
        data: findHotels,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No hotels found for the given location",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching hotels",
    });
  }
};
