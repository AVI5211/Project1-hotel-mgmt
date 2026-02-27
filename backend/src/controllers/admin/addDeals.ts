import { Request, Response } from "express";
import { newDealSchema } from "../../zod/newDealSchema";
import { STATUS_CODE } from "../../constants";
import { prisma } from "../../utils/Prisma";

export const enrollNewDeal = async (req: Request, res: Response) => {
  const dealInfo = req.body;
  const parsedInput = newDealSchema.safeParse(dealInfo);

  if (!parsedInput.success) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ msg: "zod validation failed", error: parsedInput.error.errors });
  }

  try {
    const newDeal = await prisma.newDeal.create({
      data: {
        validTill: new Date(dealInfo.validTill),
        location: dealInfo.location,
        hotelId: dealInfo.hotelId,
        packageCost: dealInfo.packageCost,
      },
    });

    return res
      .status(STATUS_CODE.ACCEPTED)
      .json({ msg: "new deal created successfully", deal: newDeal });
  } catch (error) {
    console.error("Error creating new deal:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      msg: "An error occurred while creating the new deal",
    });
  }
};
