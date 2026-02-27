import { Request, Response } from "express";
import { prisma } from "../../utils/Prisma";
import { STATUS_CODE } from "../../constants";

export const verifyBooking = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.bookingId, 10);

  if (!bookingId) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      msg: "Invalid booking ID",
    });
  }

  try {
    const updatedBooking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "confirmed",
      },
    });

    return res.status(STATUS_CODE.OK).json({
      msg: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      msg: "Error updating booking status",
      error: error,
    });
  }
};
