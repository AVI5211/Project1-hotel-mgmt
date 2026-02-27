import { z } from "zod";
export const locationSchema = z.object({
  date: z.string(),
  checkoutDate: z.string(),
  location: z.enum([
    "Kathmandu",
    "UnitedKingdom",
    "Melbourne",
    "Paris",
    "Kolkata",
    "Islamabad",
    "Moscow",
    "Bengaluru",
    "Sydney",
    "Delhi",
  ]),
  hotelId: z.number(),
});
