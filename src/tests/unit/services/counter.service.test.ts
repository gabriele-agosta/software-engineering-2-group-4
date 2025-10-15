import { CounterService } from "@/services/counter.service";
import { CounterRepository } from "@/repositories/counter.repository";
import { TicketsRepository } from "@/repositories/tickets.repository";

jest.mock("@/repositories/counter.repository");
jest.mock("@/repositories/tickets.repository");

describe("CounterService - callNextCustomer", () => {
  let counterService: CounterService;
  let mockCounterRepository: jest.Mocked<CounterRepository>;
  let mockTicketsRepository: jest.Mocked<TicketsRepository>;

  beforeEach(() => {
    mockCounterRepository = new CounterRepository() as jest.Mocked<CounterRepository>;
    mockTicketsRepository = new TicketsRepository() as jest.Mocked<TicketsRepository>;
    (CounterService.prototype as any).counterRepository = mockCounterRepository;
    (CounterService.prototype as any).ticketRepository = mockTicketsRepository;
    counterService = new CounterService();
  });

  it("should throw error if counterId is not provided", async () => {
    await expect(counterService.callNextCustomer(undefined as any)).rejects.toThrow(
      "Counter ID is required to call the next customer."
    );
  });

  it("should throw error if counter does not exist", async () => {
    mockCounterRepository.findById.mockResolvedValue(null);

    await expect(counterService.callNextCustomer(1)).rejects.toThrow("Counter not found.");
  });

  it("should return message if no customers are waiting", async () => {
    mockCounterRepository.findById.mockResolvedValue({ id: 1 });
    mockTicketsRepository.getNextTicketInQueue.mockResolvedValue(null);

    const result = await counterService.callNextCustomer(1);

    expect(result).toEqual({
      ticket: null,
      message: "No customers waiting in queue",
    });
  });

  it("should assign next ticket to counter and return ticket info", async () => {
    mockCounterRepository.findById.mockResolvedValue({ id: 1 });
    mockTicketsRepository.getNextTicketInQueue.mockResolvedValue({
      id: 10,
      serviceId: 5,
      takenAt: new Date(),
      estimatedWaitTime: "5 min",
      waitingTime: "2 min",
      serviceTime: "3 min",
      served: false,
    });
    mockTicketsRepository.assignTicketToCounter.mockResolvedValue(true);

    const result = await counterService.callNextCustomer(1);

    expect(mockTicketsRepository.assignTicketToCounter).toHaveBeenCalledWith(10, 1);
    expect(result).toEqual({
      ticket: {
        id: 10,
        serviceId: 5,
      },
      message: "Next customer assigned: Ticket #10 for service 5",
    });
  });

  it("should throw error if ticket assignment fails", async () => {
    mockCounterRepository.findById.mockResolvedValue({ id: 1 });
    mockTicketsRepository.assignTicketToCounter.mockRejectedValue(new Error("Assignment failed"));

    await expect(counterService.callNextCustomer(1)).rejects.toThrow("Assignment failed");
  });
});