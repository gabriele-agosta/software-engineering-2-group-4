import { TicketsRepository } from "@/app/lib/repositories/tickets.repository";
import { Ticket } from "@/app/lib/schemas/ticket.schema";

// Mock prisma
jest.mock("@/db", () => ({
  prisma: {
    ticket: {
      findUnique: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

const mockPrisma = require("@/db").prisma;

describe("TicketsRepository", () => {
  let repo: TicketsRepository;

  beforeEach(() => {
    repo = new TicketsRepository();
    jest.clearAllMocks();
  });

  describe("assignTicketToCounter", () => {
    it("assigns the ticket to the counter if it exists", async () => {
      const ticketId = 1;
      const counterId = 2;
      const mockTicket = {
        id: BigInt(ticketId),
        taken_at: new Date(),
      };

      mockPrisma.ticket.findUnique.mockResolvedValue(mockTicket);
      mockPrisma.ticket.update.mockResolvedValue({});

      const result = await repo.assignTicketToCounter(ticketId, counterId);

      expect(result).toBe(true);
      expect(mockPrisma.ticket.findUnique).toHaveBeenCalledWith({
        where: { id: BigInt(ticketId) },
      });
      expect(mockPrisma.ticket.update).toHaveBeenCalled();
    });

    it("throws an error if the ticket does not exist", async () => {
      mockPrisma.ticket.findUnique.mockResolvedValue(null);

      await expect(repo.assignTicketToCounter(1, 2)).rejects.toThrow(
        "Failed to assign ticket to counter"
      );
    });

    it("throws an error if prisma fails", async () => {
      mockPrisma.ticket.findUnique.mockRejectedValue(new Error("DB error"));

      await expect(repo.assignTicketToCounter(1, 2)).rejects.toThrow(
        "Failed to assign ticket to counter"
      );
    });
  });

  describe("getNextTicketInQueue", () => {
    it("returns the next ticket in the queue", async () => {
      const mockDbTicket = {
        id: BigInt(1),
        service_id: BigInt(10),
        taken_at: new Date(),
        estimated_waiting_time: "0",
        waiting_time: "00:01:00",
        service_time: "",
        served: false,
        counter_id: null,
      };

      mockPrisma.ticket.findFirst.mockResolvedValue(mockDbTicket);

      const result = await repo.getNextTicketInQueue();

      expect(result).toMatchObject({
        id: Number(mockDbTicket.id),
        serviceId: Number(mockDbTicket.service_id),
        takenAt: mockDbTicket.taken_at,
        estimatedWaitTime: mockDbTicket.estimated_waiting_time,
        waitingTime: mockDbTicket.waiting_time,
        serviceTime: mockDbTicket.service_time,
        served: mockDbTicket.served,
      });
      expect(mockPrisma.ticket.findFirst).toHaveBeenCalledWith({
        where: {
          served: false,
          counter_id: null,
        },
        orderBy: { taken_at: "asc" },
      });
    });

    it("returns null if there are no tickets", async () => {
      mockPrisma.ticket.findFirst.mockResolvedValue(null);

      const result = await repo.getNextTicketInQueue();

      expect(result).toBeNull();
    });

    it("throws an error if prisma fails", async () => {
      mockPrisma.ticket.findFirst.mockRejectedValue(new Error("DB error"));

      await expect(repo.getNextTicketInQueue()).rejects.toThrow(
        "Failed to fetch next ticket from database"
      );
    });
  });
});
