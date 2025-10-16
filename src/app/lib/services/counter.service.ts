import { CallNextCustomerResponse } from "@/schemas/counter.schema";
import { CounterRepository } from "@/repositories/counter.repository";
import { TicketsRepository } from "@/repositories/tickets.repository";

export class CounterService {
  private counterRepository: CounterRepository;
  private ticketRepository: TicketsRepository;

  constructor() {
    this.counterRepository = new CounterRepository();
    this.ticketRepository = new TicketsRepository();
  }

  async callNextCustomer(counterId: number): Promise<CallNextCustomerResponse> {
    try {
      if (!counterId) {
        throw new Error("Counter ID is required to call the next customer.");
      }

      // Check if counter exists
      const counter = await this.counterRepository.findById(counterId);
      if (!counter) {
        throw new Error("Counter not found.");
      }

      // Get next ticket from queue
      const nextTicket = await this.ticketRepository.getNextTicketInQueue();

      if (!nextTicket) {
        return {
          ticket: null,
          message: "No customers waiting in queue",
        };
      }

      // Assign ticket to counter
      await this.ticketRepository.assignTicketToCounter(
        nextTicket.id,
        counterId
      );

      return {
        ticket: {
          id: nextTicket.id,
          serviceId: nextTicket.serviceId,
        },
        message: `Next customer assigned: Ticket #${nextTicket.id} for service ${nextTicket.serviceId}`,
      };
    } catch (error) {
      throw error;
    }
  }
}
