import { CreateTicketRequest, Ticket } from "../types/ticket";

export async function createTicket(serviceId: number): Promise<Ticket> {
    try {
        if (!serviceId) {
            throw new Error("Service is required to create a ticket.");
        }
        // TODO Implement repository call after database is set up
        return new Ticket(1, serviceId);
    } 
    catch (error) {
        throw error;
    }

}