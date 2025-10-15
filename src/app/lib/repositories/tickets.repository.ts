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
                serviceId: Number(dbTicket.service_id),
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

    async getNextTicketInQueue(): Promise<Ticket | null> {
        try {
            const ticket = await prisma.ticket.findFirst({
                where: {
                    served: false,
                    counter_id: null
                },
                orderBy: { taken_at: 'asc' }
            });

            if (!ticket) {
                return null;
            }

            return {
                id: Number(ticket.id),
                serviceId: Number(ticket.service_id),
                takenAt: ticket.taken_at,
                estimatedWaitTime: ticket.estimated_waiting_time,
                waitingTime: ticket.waiting_time || "",
                serviceTime: ticket.service_time || "",
                served: ticket.served
            };
        } catch (error) {
            throw new Error('Failed to fetch next ticket from database');
        }
    }

    async assignTicketToCounter(ticketId: number, counterId: number): Promise<boolean> {
        try {
            await prisma.ticket.update({
                where: { id: BigInt(ticketId) },
                data: { 
                    counter_id: BigInt(counterId),
                    assigned_at: new Date()
                }
            });
            return true;
        } catch (error) {
            throw new Error('Failed to assign ticket to counter');
        }
    }
}