import {z} from 'zod';

export const TicketSchema = z.object({
    id: z.number().positive().min(0).int(),
    serviceId: z.number().positive().min(0).int(),
    takenAt: z.date(),
    estimatedWaitTime: z.number().min(0),
    waitingTime: z.string(),
    service_time: z.string(),
    served: z.boolean().default(false)});

export const CreateTicketRequestSchema = z.object({
    serviceId: z.number().positive().min(0).int(),
});

export const CreateTicketResponseSchema = z.object({
    id: z.number().positive().min(0).int(),
    serviceId: z.number().positive().min(0).int(),
});


export type Ticket = z.infer<typeof TicketSchema>;
export type CreateTicketRequest = z.infer<typeof CreateTicketRequestSchema>;
export type CreateTicketResponse = z.infer<typeof CreateTicketResponseSchema>;