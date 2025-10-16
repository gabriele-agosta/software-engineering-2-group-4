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
        id: Number(dbTicket.id),
        serviceId: Number(dbTicket.service_id),
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
      const ticket = await prisma.ticket.findUnique({
        where: { id: BigInt(ticketId) },
      });

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      if (!ticket.assigned_at) {
        throw new Error("Ticket has not been assigned to a counter");
      }

      const serviceTimeMs = new Date().getTime() - ticket.assigned_at.getTime();
      const hours = Math.floor(serviceTimeMs / 3600000);
      const minutes = Math.floor((serviceTimeMs % 3600000) / 60000);
      const seconds = Math.floor((serviceTimeMs % 60000) / 1000);
      const serviceTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      const dbTicket = await prisma.ticket.update({
        where: {
          id: BigInt(ticketId),
        },
        data: {
          served: true,
          service_time: serviceTime,
        },
      });

      return {
        id: Number(dbTicket.id),
        serviceId: Number(dbTicket.service_id),
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

  async getNextTicketInQueue(): Promise<Ticket | null> {
    try {
      const ticket = await prisma.ticket.findFirst({
        where: {
          served: false,
          counter_id: null,
        },
        orderBy: { taken_at: "asc" },
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
        served: ticket.served,
      };
    } catch (error) {
      throw new Error("Failed to fetch next ticket from database");
    }
  }

  async assignTicketToCounter(
    ticketId: number,
    counterId: number
  ): Promise<boolean> {
    try {
      console.log(`Assigning ticket ${ticketId} to counter ${counterId}`);
      const ticket = await prisma.ticket.findUnique({
        where: { id: BigInt(ticketId) },
      });

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      const assignedAt = new Date();
      const waitingTimeMs =
        assignedAt.getTime() - new Date(ticket.taken_at).getTime();
      const hours = Math.floor(waitingTimeMs / 3600000);
      const minutes = Math.floor((waitingTimeMs % 3600000) / 60000);
      const seconds = Math.floor((waitingTimeMs % 60000) / 1000);
      const waitingTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      await prisma.ticket.update({
        where: { id: BigInt(ticketId) },
        data: {
          counter_id: BigInt(counterId),
          assigned_at: assignedAt,
          waiting_time: waitingTime,
        },
      });
      return true;
    } catch (error) {
      throw new Error("Failed to assign ticket to counter");
    }
  }
}
