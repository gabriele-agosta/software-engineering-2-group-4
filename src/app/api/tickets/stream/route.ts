import { NextRequest } from "next/server";
import { notifier } from "@/app/lib/notifier/notifier";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Add client to active connections
      notifier.addClient(controller);

      // Send initial connection message
      const data = `data: ${JSON.stringify({ type: "connected" })}\n\n`;
      controller.enqueue(encoder.encode(data));

      // Cleanup on close
      request.signal.addEventListener("abort", () => {
        notifier.removeClient(controller);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
