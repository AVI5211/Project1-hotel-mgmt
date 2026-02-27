import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import createToken from "../../../utils/createToken";
import { IPayload } from "../../../types/Ipayload";
import { STATUS_CODE } from "../../../constants";

const prisma = new PrismaClient();

export const guestSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.guest.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const payload: IPayload = {
      email: user.email,
      id: user.id,
    };

    const token = createToken(payload);

    return res
      .status(STATUS_CODE.OK)
      .json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred", error });
  } finally {
    await prisma.$disconnect();
  }
};
