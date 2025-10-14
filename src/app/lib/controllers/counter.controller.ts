import { CounterService } from '@/services/counter.service';
import { CallNextCustomerResponse } from '@/schemas/counter.schema';

export class CounterController {
    private counterService: CounterService;

    constructor() {
        this.counterService = new CounterService();
    }

    async callNextCustomer(counterId: number): Promise<CallNextCustomerResponse> {
        try {
            // Input validation
            if (!counterId || counterId <= 0) {
                throw new Error("Valid counter ID is required");
            }

            return await this.counterService.callNextCustomer(counterId);
        } catch (error) {
            throw error;
        }
    }
}
