import { TicketsService } from '@/services/tickets.service';

export class TicketsController {
    private ticketsService: TicketsService;

    constructor() {
        this.ticketsService = new TicketsService();
    }

    async createTicket(serviceId: number): Promise<number> {
        try {
            //input validation after repo implementation, and decide what to return
            return await this.ticketsService.createTicket(serviceId);
        } catch (error) {
            throw error;
        }
    }
}