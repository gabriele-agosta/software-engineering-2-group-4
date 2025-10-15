import { makeInMemoryQueue } from "./helpers";

describe("Call customer - unit test", () => {
  test("should call next ticket in FIFO order and handle empty queue", () => {
    const queue = makeInMemoryQueue();

    // Create sample tickets
    const t1 = queue.createTicket("S1");
    const t2 = queue.createTicket("S1");

    // First call should return first ticket
    const c1 = queue.callNext("S1", "C1");
    expect(c1).not.toBeNull();
    expect(c1?.ticketId).toBe(t1.ticketId);
    expect(c1?.counterId).toBe("C1");

    // Second call should return second ticket
    const c2 = queue.callNext("S1", "C1");
    expect(c2).not.toBeNull();
    expect(c2?.ticketId).toBe(t2.ticketId);

    // Third call - queue is empty now
    const c3 = queue.callNext("S1", "C1");
    expect(c3).toBeNull();
  });
});
