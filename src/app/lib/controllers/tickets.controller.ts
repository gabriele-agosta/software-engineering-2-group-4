import { TicketsService } from '@/services/tickets.service';
import { CreateTicketRequestSchema, CreateTicketResponse } from '../schemas/ticket.schema';

export class TicketsController {
    private ticketsService: TicketsService;

    constructor() {
        this.ticketsService = new TicketsService();
    }

    async createTicket(serviceId: number): Promise<CreateTicketResponse> {
        try {
            const request = CreateTicketRequestSchema.parse({ serviceId });
            //input validation after repo implementation, and decide what to return
            return await this.ticketsService.createTicket(request.serviceId);
        } catch (error) {
            throw error;
        }
    }
}