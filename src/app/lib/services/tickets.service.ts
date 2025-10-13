import { CreateTicketResponse } from '@/schemas/ticket.schema';

export class TicketsService {
    async createTicket(serviceId: number): Promise<CreateTicketResponse> {
        try {
            if (!serviceId) {
                throw new Error("Service is required to create a ticket.");
            }
            // TODO Implement repository call after database is set up, need to choose if to return ticket + service id or just ticket id
            return { id: 1, serviceId: serviceId };
        }
        catch (error) {
            throw error;
        }
    }
}