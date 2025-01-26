import { z } from 'zod';

export const PouchSizeSchema = z.enum(['A', 'B', 'C', 'D', 'E', 'F']);

export const CatSchema = z.object({
  name: z.string(),
  subscriptionActive: z.boolean(),
  breed: z.string(),
  pouchSize: PouchSizeSchema,
});

export const DeliverySchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  cats: z.array(CatSchema),
});

export const DeliveriesSchema = z.array(DeliverySchema);

export type PouchSizeSchemaType = z.infer<typeof PouchSizeSchema>;
export type CatSchemaType = z.infer<typeof CatSchema>;
export type DeliverySchemaType = z.infer<typeof DeliverySchema>;
export type DeliveriesSchemaType = z.infer<typeof DeliveriesSchema>;
