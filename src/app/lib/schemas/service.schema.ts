import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.int().positive(),
  name: z.string().min(1).max(255),
  expectedWaitTime: z.string().optional(),
});

export const ServiceResponseSchema = z.object({
  id: z.int().positive(),
  name: z.string().min(1).max(255),
});

export type Service = z.infer<typeof ServiceSchema>;
export type ServiceResponse = z.infer<typeof ServiceResponseSchema>;
