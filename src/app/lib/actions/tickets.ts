'use server';
import { createTicket as createTicketService }  from '../services/tickets.service';

//fast implementation just for have a function for the frontend to call when desisgning the UI
export async function createTicket(serviceId: number) {
    try {
        const ticket = await createTicketService(serviceId);
        return {id : ticket.id, serviceId: ticket.serviceId}; //need to know if serviceId is neccessary
    } catch (error) {
        throw error;
    }
}
