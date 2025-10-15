import { z } from "zod";

export const CounterSchema = z.object({
  id: z.number().positive().int(),
});

export const CallNextCustomerRequestSchema = z.object({
  counterId: z.number().positive().int(),
});

export const CallNextCustomerResponseSchema = z.object({
  ticket: z
    .object({
      id: z.int().positive(),
      serviceId: z.int().positive(),
    })
    .nullable(),
  message: z.string(),
});

export type Counter = z.infer<typeof CounterSchema>;
export type CallNextCustomerRequest = z.infer<
  typeof CallNextCustomerRequestSchema
>;
export type CallNextCustomerResponse = z.infer<
  typeof CallNextCustomerResponseSchema
>;
