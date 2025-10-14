import { Ticket } from "@/schemas/ticket.schema";
import { TicketsRepository } from "@/repositories/tickets.repository";

export class TicketsService {
  private ticketsRepository: TicketsRepository;

  constructor() {
    this.ticketsRepository = new TicketsRepository();
  }

  async createTicket(serviceId: bigint): Promise<Ticket> {
    try {
      return this.ticketsRepository.createTicket({ serviceId });
    } catch (error) {
      throw error;
    }
  }

  async markTicketAsServed(ticketId: number): Promise<Ticket> {
    try {
      return this.ticketsRepository.markTicketAsServed(ticketId);
    } catch (error) {
      throw error;
    }
  }
}
