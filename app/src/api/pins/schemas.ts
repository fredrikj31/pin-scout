import { z } from "zod";

export const PinSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
export type Pin = z.infer<typeof PinSchema>;
