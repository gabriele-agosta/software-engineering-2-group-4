'use server';

import { TicketsController } from '@/controllers/tickets.controller';

export async function createTicket(serviceId: number) {
    try {
        const controller = new TicketsController();
        const ticket = await controller.createTicket(serviceId);
        
        //basic error handling, can be improved if needed
        return ticket;
    } catch (error) {
        console.error('[createTicket] Action failed:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to create ticket' 
        };
    }
}
