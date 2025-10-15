export type Ticket = { ticketId: string; serviceId: string; position: number; createdAt: string };
export type CallResult = { ticketId: string; counterId: string };

export function makeInMemoryQueue() {
  const queues = new Map<string, Ticket[]>();
  return {
    createTicket(serviceId: string): Ticket {
      const q = queues.get(serviceId) ?? [];
      const t: Ticket = {
        ticketId: 'T' + (Date.now() + q.length),
        serviceId,
        position: q.length + 1,
        createdAt: new Date().toISOString(),
      };
      q.push(t);
      queues.set(serviceId, q);
      return t;
    },
    callNext(serviceId: string, counterId: string): CallResult | null {
      const q = queues.get(serviceId) ?? [];
      const t = q.shift();
      queues.set(serviceId, q);
      return t ? { ticketId: t.ticketId, counterId } : null;
    },
    count(serviceId: string) {
      return (queues.get(serviceId) ?? []).length;
    },
  };
}
