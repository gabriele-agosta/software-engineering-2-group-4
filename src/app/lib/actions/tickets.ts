"use server";

import { TicketsController } from "@/controllers/tickets.controller";
import { callNextCustomer } from "@/actions/counter";
import { Ticket } from "@/schemas/ticket.schema";
import dayjs from "dayjs";
import { notifier } from "../notifier/notifier";

function serializeTicket(ticket: any): any {
  return {
    ...ticket,
    id: typeof ticket.id === "bigint" ? Number(ticket.id) : ticket.id,
    serviceId:
      typeof ticket.serviceId === "bigint"
        ? Number(ticket.serviceId)
        : ticket.serviceId,
  };
}

export async function createTicket(serviceId: number) {
  try {
    const controller = new TicketsController();
    const ticket = await controller.createTicket(serviceId);

    //basic error handling, can be improved if needed
    return ticket;
  } catch (error) {
    console.error("[createTicket] Action failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create ticket",
    };
  }
}

// When the story to setup counters will be implemented, this function should be completed
// to only choose tickets from a specific counter's services.
export async function callNextTicket(serviceId: number, counterId: number) {
  try {
    const result = await callNextCustomer(counterId);
    const ticket = result?.ticket ?? null;

    if (ticket) {
      const currentDate = dayjs();
      const formattedDate = currentDate.format("YYYY-MM-DD HH:mm:ss");
      const serializedTicket = serializeTicket(ticket);

      notifier.notifyTicketCall({
        ticket: serializedTicket,
        counterId,
        timestamp: formattedDate,
      });
      return serializedTicket;
    }

    return null;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to call next ticket"
    );
  }
}

export async function markTicketAsServed(ticketId: number): Promise<Ticket> {
  try {
    const controller = new TicketsController();
    const ticket = await controller.markTicketAsServed(ticketId);

    return ticket;
  } catch (error) {
    console.error("[markTicketAsServed] Action failed:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to mark ticket as served"
    );
  }
}
