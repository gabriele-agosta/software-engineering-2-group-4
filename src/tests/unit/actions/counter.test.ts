import { callNextCustomer } from '@/actions/counter';
import { CounterController } from '@/controllers/counter.controller';
import { CallNextCustomerResponse } from '@/schemas/counter.schema';

// Mock CounterController
jest.mock('@/controllers/counter.controller', () => {
    return {
        CounterController: jest.fn().mockImplementation(() => ({
            callNextCustomer: jest.fn()
        }))
    };
});

describe('callNextCustomer', () => {
    const mockResponse: CallNextCustomerResponse = {
        ticket: { id: 1, serviceId: 2},
        message: "Next customer called"
    };

    beforeEach(() => {
        // Reset mock implementation before each test
        (CounterController as jest.Mock).mockClear();
        (CounterController as jest.Mock).mockImplementation(() => ({
            callNextCustomer: jest.fn().mockResolvedValue(mockResponse)
        }));
    });

    it('should return result from controller when successful', async () => {
        const result = await callNextCustomer(1);
        expect(result).toEqual(mockResponse);
    });

    it('should return error message when controller throws', async () => {
        (CounterController as jest.Mock).mockImplementation(() => ({
            callNextCustomer: jest.fn().mockRejectedValue(new Error('Test error'))
        }));

        const result = await callNextCustomer(1);
        expect(result.ticket).toBeNull();
        expect(result.message).toBe('Test error');
    });

    it('should return generic error message for non-Error exceptions', async () => {
        (CounterController as jest.Mock).mockImplementation(() => ({
            callNextCustomer: jest.fn().mockRejectedValue('Unknown error')
        }));

        const result = await callNextCustomer(1);
        expect(result.ticket).toBeNull();
        expect(result.message).toBe('An error occurred while calling the next customer');
    });
});