import { z } from "zod";
export const newDealSchema = z.object({
  validTill: z.string(),
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
  packageCost: z.number(),
});
