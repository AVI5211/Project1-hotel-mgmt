import { Response, Request } from "express";
import { prisma } from "../../../utils/Prisma";
import { adminSchema } from "../../../zod/adminAuthSchema";
import { STATUS_CODE } from "../../../constants";
import createToken from "../../../utils/createToken";
import { IPayload } from "../../../types/Ipayload";

export const adminSignup = async (req: Request, res: Response) => {
  const adminDetails = req.body;
  const parsedInput = adminSchema.safeParse(adminDetails);

  if (!parsedInput.success) {
    return res
      .status(STATUS_CODE.EXPECTATION_FAILED)
      .json({ msg: "Zod validation failed", error: parsedInput.error.message });
  }

  try {
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        OR: [{ email: adminDetails.email }, { name: adminDetails.name }],
      },
    });

    if (existingAdmin) {
      return res.status(STATUS_CODE.CONFLICT).json({
        msg: "Admin with the same email or name already exists",
      });
    }

    const newUser = await prisma.admin.create({
      data: {
        name: adminDetails.name,
        email: adminDetails.email,
        password: adminDetails.password,
      },
    });

    const payload: IPayload = {
      email: newUser.email,
      id: newUser.id,
    };

    const token = createToken(payload);

    return res.status(STATUS_CODE.CREATED).json({
      msg: "Admin created successfully",
      token,
    });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      msg: "Error creating admin",
      error: error,
    });
  }
};
