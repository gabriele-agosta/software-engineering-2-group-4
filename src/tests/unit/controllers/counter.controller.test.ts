import { CounterController } from "@/controllers/counter.controller";
import { Counter } from "@/schemas/counter.schema";

const mockCounterService = {
    callNextCustomer: jest.fn(),
};

jest.mock("../../../app/lib/services/counter.service", () => {
    return {
        CounterService: jest.fn().mockImplementation(() => mockCounterService)
    }
});

describe('CounterController', () => {
    let counterController= new CounterController();

    beforeEach(() => {
        counterController = new CounterController();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call next customer successfully", async () => {
        const counterId = 1;
        const mockResponse: Counter = {
            id: counterId,
        };

        mockCounterService.callNextCustomer.mockResolvedValue(mockResponse);

        const result = await counterController.callNextCustomer(counterId);

        expect(result).toEqual(mockResponse);
        expect(mockCounterService.callNextCustomer).toHaveBeenCalledWith(counterId);
    });
    it("should throw error for invalid counter ID", async () => {
        const invalidCounterId = -1;

        await expect(counterController.callNextCustomer(invalidCounterId)).rejects.toThrow("Valid counter ID is required");
        expect(mockCounterService.callNextCustomer).not.toHaveBeenCalled();
    });
    it("should handle service errors", async () => {
        const counterId = 1;
        const serviceError = new Error("'Failed to fetch counter from database");
        mockCounterService.callNextCustomer.mockRejectedValue(serviceError);

        await expect(counterController.callNextCustomer(counterId)).rejects.toThrow("Failed to fetch counter from database");
    });
});