import { makeInMemoryQueue } from "./helpers";

describe("Ticket creation - unit test", () => {
  test("should create a ticket with correct fields and increment position", () => {
    const queue = makeInMemoryQueue();

    const t1 = queue.createTicket("S1");
    const t2 = queue.createTicket("S1");

    // Validate ticket fields
    expect(t1).toHaveProperty("ticketId");
    expect(t1).toHaveProperty("serviceId", "S1");
    expect(t1).toHaveProperty("position", 1);
    expect(typeof t1.createdAt).toBe("string");

    // Position should increase on next ticket
    expect(t2.position).toBe(2);

    // Queue should contain 2 tickets
    expect(queue.count("S1")).toBe(2);
  });
});
