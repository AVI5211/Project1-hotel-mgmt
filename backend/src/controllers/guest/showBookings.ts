import { Request, Response } from "express";
import { prisma } from "../../utils/Prisma";
import { STATUS_CODE } from "../../constants";

const bookingHistory = async (req: Request, res: Response) => {
  try {
    const bookingHistory = await prisma.booking.findMany({
      where: {
        guestId: res.locals.user.id,
      },
    });
    return res.status(STATUS_CODE.OK).json(bookingHistory);
  } catch (error) {
    console.error("Error fetching booking history:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching booking history",
    });
  }
};

export default bookingHistory;
