import { z } from "zod";

export const TicketSchema = z.object({
  id: z.bigint().positive(),
  serviceId: z.bigint().positive(),
  takenAt: z.date(),
  estimatedWaitTime: z.string(),
  waitingTime: z.string(),
  serviceTime: z.string(),
  served: z.boolean().default(false),
});

export const CreateTicketRequestSchema = z.object({
  serviceId: z.bigint().positive(),
});

export const CreateTicketResponseSchema = z.object({
  id: z.bigint().positive(),
  serviceId: z.bigint().positive(),
});

export type Ticket = z.infer<typeof TicketSchema>;
export type CreateTicketRequest = z.infer<typeof CreateTicketRequestSchema>;
export type CreateTicketResponse = z.infer<typeof CreateTicketResponseSchema>;
