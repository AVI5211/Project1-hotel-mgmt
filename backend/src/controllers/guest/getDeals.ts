import { Request, Response } from "express";
import { prisma } from "../../utils/Prisma";
import { STATUS_CODE } from "../../constants";

export const getDeals = async (req: Request, res: Response) => {
  try {
    const listOfDeals = await prisma.newDeal.findMany();
    res.status(STATUS_CODE.FOUND).json({ deals: listOfDeals });
  } catch (error) {
    console.error("Error fetching deals:", error);
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch deals" });
  }
};
