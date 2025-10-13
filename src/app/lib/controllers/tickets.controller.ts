import { TicketsService } from '@/services/tickets.service';
import { CreateTicketRequestSchema, CreateTicketResponse, CreateTicketResponseSchema } from '../schemas/ticket.schema';

export class TicketsController {
    private ticketsService: TicketsService;

    constructor() {
        this.ticketsService = new TicketsService();
    }

    async createTicket(serviceId: number): Promise<CreateTicketResponse> {
        try {
            const request = CreateTicketRequestSchema.parse({ serviceId });
            
            const response = await this.ticketsService.createTicket(request.serviceId);
            return CreateTicketResponseSchema.parse(response);
        } catch (error) {
            throw error;
        }
    }
}