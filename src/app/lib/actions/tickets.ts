'use server';

import { TicketsController } from '../controllers/tickets.controller';

export async function createTicket(serviceId: number) {
    try {
        const controller = new TicketsController();
        const ticket = await controller.createTicket(serviceId);
        
        //change implementation after DB is set up and decide what to return
        return ticket;
    } catch (error) {
        //better error handling after deciding what to return
        return error;
    }
}
