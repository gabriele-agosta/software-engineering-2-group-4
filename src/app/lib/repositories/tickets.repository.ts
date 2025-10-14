import { prisma } from "@/db";
import { Ticket, CreateTicketRequest } from "@/schemas/ticket.schema";

export class TicketsRepository {
  async createTicket(request: CreateTicketRequest): Promise<Ticket> {
    try {
      const dbTicket = await prisma.ticket.create({
        data: {
          service_id: BigInt(request.serviceId),
          taken_at: new Date(),
          estimated_waiting_time: "0",
        },
      });

      return {
        id: dbTicket.id,
        serviceId: dbTicket.service_id,
        takenAt: dbTicket.taken_at,
        estimatedWaitTime: dbTicket.estimated_waiting_time,
        waitingTime: dbTicket.waiting_time || "",
        serviceTime: dbTicket.service_time || "",
        served: dbTicket.served,
      };
    } catch (error) {
      throw new Error("Could not create ticket");
    }
  }

  async markTicketAsServed(ticketId: number): Promise<Ticket> {
    try {
      const dbTicket = await prisma.ticket.update({
        where: {
          id: BigInt(ticketId),
        },
        data: {
          served: true,
        },
      });

      return {
        id: dbTicket.id,
        serviceId: dbTicket.service_id,
        takenAt: dbTicket.taken_at,
        estimatedWaitTime: dbTicket.estimated_waiting_time,
        waitingTime: dbTicket.waiting_time || "",
        serviceTime: dbTicket.service_time || "",
        served: dbTicket.served,
      };
    } catch (error) {
      console.error(
        "[TicketsRepository] Error marking ticket as served:",
        error
      );
      throw new Error("Could not mark ticket as served");
    }
  }
}
