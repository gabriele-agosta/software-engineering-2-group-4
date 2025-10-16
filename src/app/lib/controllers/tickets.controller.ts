import { TicketsService } from "@/services/tickets.service";
import {
  Ticket,
  CreateTicketRequestSchema,
  CreateTicketResponse,
  CreateTicketResponseSchema,
} from "../schemas/ticket.schema";

export class TicketsController {
  private ticketsService: TicketsService;

  constructor() {
    this.ticketsService = new TicketsService();
  }

  async createTicket(serviceId: number): Promise<CreateTicketResponse> {
    try {
      const request = CreateTicketRequestSchema.parse({ serviceId });

      const response = await this.ticketsService.createTicket(
        request.serviceId
      );
      return CreateTicketResponseSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  async markTicketAsServed(ticketId: number): Promise<Ticket> {
    try {
      if (!ticketId || ticketId <= 0) {
        throw new Error("Invalid ticket ID");
      }

      return await this.ticketsService.markTicketAsServed(ticketId);
    } catch (error) {
      console.error(
        "[TicketsController] Error marking ticket as served:",
        error
      );
      throw error;
    }
  }
}
