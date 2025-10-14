type TicketCallNotification = {
  ticket: any;
  counterId: number;
  timestamp: string;
};

class Notifier {
  private clients: Set<ReadableStreamDefaultController> = new Set();

  constructor() {
    if (!(globalThis as any).__notifierClients) {
      (globalThis as any).__notifierClients =
        new Set<ReadableStreamDefaultController>();
    }
    this.clients = (globalThis as any).__notifierClients;
  }

  addClient(controller: ReadableStreamDefaultController) {
    this.clients.add(controller);
  }

  removeClient(controller: ReadableStreamDefaultController) {
    this.clients.delete(controller);
  }

  notifyTicketCall(notification: TicketCallNotification) {
    console.log(
      "[Notifier] Notifying clients:",
      this.clients.size,
      notification
    );
    const encoder = new TextEncoder();
    const data = `data: ${JSON.stringify({
      type: "ticket_called",
      ...notification,
    })}\n\n`;

    this.clients.forEach((controller) => {
      try {
        console.log("[Notifier] Sending to client");
        controller.enqueue(encoder.encode(data));
      } catch (error) {
        console.error("[Notifier] Error sending to client:", error);
        // Client disconnected, remove it
        this.clients.delete(controller);
      }
    });
  }
}

export const notifier = new Notifier();
