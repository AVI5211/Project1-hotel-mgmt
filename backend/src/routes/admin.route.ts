import { Router } from "express";
import { adminSignup } from "../controllers/auth/admin/adminSignup";
import { adminSignin } from "../controllers/auth/admin/adminSignin";
import { verifyBooking } from "../controllers/admin/verifyBooking";
import { addHotel } from "../controllers/admin/addHotel";
import { adminRoleCheck } from "../middlewares/admin.role";
import { authMiddleware } from "../middlewares/jwt.auth";
import { enrollNewDeal } from "../controllers/admin/addDeals";
import upload from "../utils/multer-config";

export const adminRouter = Router();

adminRouter.post("/signup", adminSignup);
adminRouter.post("/signin", adminSignin);
adminRouter.post("/verify/:bookingId", verifyBooking);
adminRouter.post(
  "/add",
  authMiddleware,
  adminRoleCheck,
  upload.single("hotelImage"),
  addHotel
);
adminRouter.post("/newdeal", authMiddleware, adminRoleCheck, enrollNewDeal);
