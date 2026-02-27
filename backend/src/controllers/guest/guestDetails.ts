import { Request, Response } from "express";
import { prisma } from "../../utils/Prisma";
import { STATUS_CODE } from "../../constants";

export const guestDetails = async (req: Request, res: Response) => {
  try {
    const guestId = res.locals.user.id;

    const guestDetails = await prisma.guest.findUnique({
      where: {
        id: guestId,
      },
      select: {
        name: true,
        email: true,
        phoneNumber: true,
        dateOfBirth: true,
        language: true,
        work: true,
        address: true,
        password: false,
      },
    });

    if (!guestDetails) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        msg: "Guest not found",
      });
    }

    return res.status(STATUS_CODE.OK).json({
      msg: "Guest details retrieved successfully",
      guestDetails,
    });
  } catch (error: any) {
    console.error("Error fetching guest details:", error);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      msg: "An error occurred while fetching guest details",
      error: error.message,
    });
  }
};
