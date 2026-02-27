import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/Prisma";
import { STATUS_CODE } from "../constants";

export const adminRoleCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminEmail = res.locals.user.email;

    const adminExists = await prisma.admin.findUnique({
      where: {
        email: adminEmail,
      },
    });

    if (adminExists) {
      console.log(adminEmail);
      return next();
    }

    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ msg: "Only admin can access this route" });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error checking admin role", error: error });
  }
};
