import jwt from "jsonwebtoken";
import { IPayload } from "../types/Ipayload";

const createToken = (payload: IPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!);
};

export default createToken;
