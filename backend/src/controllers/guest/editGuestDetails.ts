import { Request, Response } from "express";
import { prisma } from "../../utils/Prisma";

interface UpdateGuestRequest extends Request {
  body: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    language?: string;
    work?: string;
    address?: string;
  };
}

export const editGuestDetails = async (
  req: UpdateGuestRequest,
  res: Response
) => {
  const { name, email, phoneNumber, dateOfBirth, language, work, address } =
    req.body;

  try {
    const guestId = res.locals.user.id;

    const updatedFields: Partial<typeof req.body> = {};

    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (phoneNumber) updatedFields.phoneNumber = phoneNumber;
    if (dateOfBirth)
      updatedFields.dateOfBirth = new Date(dateOfBirth).toISOString();
    if (language) updatedFields.language = language;
    if (work) updatedFields.work = work;
    if (address) updatedFields.address = address;

    await prisma.guest.update({
      where: { id: guestId },
      data: updatedFields,
    });

    const updatedGuest = await prisma.guest.findUnique({
      where: { id: guestId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        dateOfBirth: true,
        language: true,
        work: true,
        address: true,
      },
    });

    return res.status(200).json({
      msg: "Guest profile updated successfully",
      guestDetails: updatedGuest,
    });
  } catch (err) {
    console.error("Error occurred:", err);

    if (err instanceof Error) {
      return res.status(500).json({
        msg: "Failed to update guest details",
        error: err.message,
      });
    }

    return res.status(500).json({
      msg: "Failed to update guest details",
      error: "Unknown error occurred",
    });
  }
};
