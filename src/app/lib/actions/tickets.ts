'use server';

import { revalidatePath } from 'next/cache';
import { createTicket } from '../services/tickets.service';

//fast implementation just for have a function fro the frontend to call when desisgning the UI
export async function createTicketAction(serviceId: number) {
    try {
        const ticket = await createTicket(serviceId);
        revalidatePath('/tickets');
        return ticket;
    } catch (error) {
        throw error;
    }
}
