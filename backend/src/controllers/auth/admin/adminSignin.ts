import { Response, Request } from "express";
import { prisma } from "../../../utils/Prisma";
import { STATUS_CODE } from "../../../constants";
import createToken from "../../../utils/createToken";
import { IPayload } from "../../../types/Ipayload";

export const adminSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (!admin || admin.password !== password) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ msg: "Invalid email or password" });
    }

    const payload: IPayload = {
      email: admin.email,
      id: admin.id,
    };

    const token = createToken(payload);

    return res.status(STATUS_CODE.OK).json({
      msg: "Signin successful",
      token,
    });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      msg: "Error during signin",
      error: error,
    });
  }
};
