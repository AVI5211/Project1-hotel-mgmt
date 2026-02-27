import { string, z } from "zod";

export const passportSchema = z.object({
  passportNumber: z.string(),
  passportIssueDate: z.string(),
  passportExpiryDate: z.string(),
  dateOfBirth: z.string(),
  placeOfBirth: z.string(),
  passportCountry: z.string(),
});
