import { Router } from "express";
import { GuestSignup } from "../controllers/auth/guest/guestSignup";
import { authMiddleware } from "../middlewares/jwt.auth";
import { guestVerification } from "../middlewares/guest.role";
import { newBooking } from "../controllers/guest/guestNewBooking";
import { guestSignin } from "../controllers/auth/guest/guestSignin";
import { getDeals } from "../controllers/guest/getDeals";
import { getHotelByLocation } from "../controllers/guest/getHotelByLocation";
import { acceptDeal } from "../controllers/guest/acceptDeal";
import bookingHistory from "../controllers/guest/showBookings";
import { guestDetails } from "../controllers/guest/guestDetails";
import { editGuestDetails } from "../controllers/guest/editGuestDetails";
export const guestRouter = Router();

guestRouter.post("/signup", GuestSignup);
guestRouter.post("/signin", guestSignin);
guestRouter.post("/newbooking", authMiddleware, newBooking);
guestRouter.post("/getdeal/:dealId", authMiddleware, acceptDeal);

guestRouter.get("/deals", authMiddleware, getDeals);
guestRouter.get("/hotels", authMiddleware, getHotelByLocation);
guestRouter.get("/bookings", authMiddleware, bookingHistory);
guestRouter.get("/profile", authMiddleware, guestDetails);
guestRouter.put("/profile", authMiddleware, editGuestDetails);
