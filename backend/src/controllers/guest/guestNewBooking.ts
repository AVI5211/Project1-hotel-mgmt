import { Request, Response } from "express";
import { prisma } from "../../utils/Prisma";
import { locationSchema } from "../../zod/locationSchema";
import { STATUS_CODE } from "../../constants";

export const newBooking = async (req: Request, res: Response) => {
  const newBooking = req.body;
  const parsedInput = locationSchema.safeParse(newBooking);

  if (!parsedInput.success) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ msg: "zod validation failed", err: parsedInput.error.errors });
  }

  const guestId = res.locals.user.id;
  const hotelId = newBooking.hotelId;

  try {
    const guestExists = await prisma.guest.findUnique({
      where: { id: guestId },
    });

    if (!guestExists) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        msg: "Guest not found",
      });
    }

    const hotelExists = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotelExists) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        msg: "Hotel not found",
      });
    }

    const newBookingRequest = await prisma.booking.create({
      data: {
        date: new Date(newBooking.date),
        checkoutDate: new Date(newBooking.checkoutDate),
        location: newBooking.location,
        guestId: guestId,
        hotelId: hotelId,
        cost: newBooking.cost,
      },
    });

    return res.status(STATUS_CODE.CREATED).json({
      msg: "Booking created successfully",
      booking: newBookingRequest,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      msg: "Error creating booking",
      error: error,
    });
  }
};
