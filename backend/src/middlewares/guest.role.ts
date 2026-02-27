import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../constants";
import { prisma } from "../utils/Prisma";

export const guestVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user || !user.email) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }

    const guestExists = await prisma.guest.findUnique({
      where: {
        email: user.email,
      },
    });

    if (guestExists) {
      return next();
    } else {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error during guest verification:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      msg: "Internal Server Error",
    });
  }
};
