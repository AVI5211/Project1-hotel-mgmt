import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../constants";
import { verifyToken } from "../utils/checkToken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ message: "Token not found" });
  }

  try {
    const decodedToken = await verifyToken(token);
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ message: "Provide a valid token" });
  }
};
