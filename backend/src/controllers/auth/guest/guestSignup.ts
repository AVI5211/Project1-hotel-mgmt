import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { STATUS_CODE } from "../../../constants";
import { guestAuthSchema } from "../../../zod/guestAuthSchema";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import createToken from "../../../utils/createToken";
import { IPayload } from "../../../types/Ipayload";

const prisma = new PrismaClient();

export const GuestSignup = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    dateOfBirth,
    phoneNumber,
    language,
    work,
    address,
  } = req.body;

  const parsedInput = guestAuthSchema.safeParse(req.body);

  if (!parsedInput.success) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: "Invalid Input", errors: parsedInput.error.errors });
  }

  try {
    const existingUser = await prisma.guest.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.guest.create({
      data: {
        name,
        email,
        password: hashedPassword,
        dateOfBirth: new Date(dateOfBirth),
        phoneNumber,
        language,
        work,
        address,
      },
    });

    const payload: IPayload = {
      email: newUser.email,
      id: newUser.id,
    };

    const token = createToken(payload);

    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: "User Created Successfully", token });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "An Error Occurred", error });
  } finally {
    await prisma.$disconnect();
  }
};
