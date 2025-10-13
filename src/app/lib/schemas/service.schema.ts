import {z} from 'zod';

export const ServiceSchema = z.object({
    id: z.number().positive().min(0).int(),
    name: z.string().min(1).max(255),
    expectedWaitTime: z.number().positive().min(0).int().optional(),
});

export type Service = z.infer<typeof ServiceSchema>;