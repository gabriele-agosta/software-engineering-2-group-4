import {prisma} from '@/db'
import { Ticket, CreateTicketRequest } from '@/schemas/ticket.schema'

export class TicketsRepository {
    async createTicket(request: CreateTicketRequest): Promise<Ticket> {
        try {
            const dbTicket = await prisma.ticket.create({
                data: {
                    service_id: BigInt(request.serviceId),
                    taken_at: new Date(),
                    estimated_waiting_time: "0",
                }
            });
            
           
            return {
                id: Number(dbTicket.id),
                serviceId: dbTicket.service_id,
                takenAt: dbTicket.taken_at,
                estimatedWaitTime: dbTicket.estimated_waiting_time,
                waitingTime: dbTicket.waiting_time || "",
                serviceTime: dbTicket.service_time || "",
                served: dbTicket.served
            };
        } catch (error) {
            throw new Error('Could not create ticket');
        }
    }
}