import { Request, Response } from "express";
import { prisma } from "../../utils/Prisma";
import { STATUS_CODE } from "../../constants";

export const acceptDeal = async (req: Request, res: Response) => {
  try {
    const dealId = parseInt(req.params.dealId);

    const getDeal = await prisma.newDeal.findUnique({
      where: {
        id: dealId,
      },
    });

    if (!getDeal) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "Deal not found" });
    }

    const location = getDeal.location;
    const hotelId = getDeal.hotelId;

    const userId = res.locals.user.id;
    const { date, checkoutDate, type } = req.body;

    const newBooking = await prisma.booking.create({
      data: {
        date: new Date(date),
        checkoutDate: new Date(checkoutDate),
        hotelId: hotelId,
        guestId: userId,
        location: location,
      },
    });

    return res.status(STATUS_CODE.ACCEPTED).json({
      msg: "Booking Request Sent Successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error accepting deal:", error);
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
