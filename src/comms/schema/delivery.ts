import { z } from 'zod';

export const DeliveryResponseSchema = z.object({
  title: z.string(),
  message: z.string(),
  totalPrice: z.number(),
  freeGift: z.boolean(),
});

export type DeliveryResponseType = z.infer<typeof DeliveryResponseSchema>;
