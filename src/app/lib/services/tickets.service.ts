export class TicketsService {
    async createTicket(serviceId: number): Promise<number> {
        try {
            if (!serviceId) {
                throw new Error("Service is required to create a ticket.");
            }
            // TODO Implement repository call after database is set up, need to choose if to return ticket + service id or just ticket id
            return 1;
        }
        catch (error) {
            throw error;
        }
    }
}