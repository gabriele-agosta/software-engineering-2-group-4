"use client";

import { callNextTicket } from "@/lib/actions/tickets";
import dayjs from "dayjs";
import { markTicketAsServed } from "@/lib/actions/tickets";
import { useState } from "react";

export default function CounterPage() {
  const [loading, setLoading] = useState(false);
  const [lastTicket, setLastTicket] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCallNext() {
    setLoading(true);
    setError(null);
    try {
      console.log("[CounterPage] Calling next ticket...");
      if (lastTicket) {
        await markTicketAsServed(lastTicket.id);
      }
      const ticket = await callNextTicket(BigInt(1));
      console.log("[CounterPage] Ticket called:", ticket);
      setLastTicket(ticket);
    } catch (err) {
      console.error("[CounterPage] Error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Counter Panel</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <button
            onClick={handleCallNext}
            disabled={loading}
            className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Calling Next Customer..." : "Call Next Customer"}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {lastTicket && (
            <div className="mt-6 p-6 bg-green-50 border-2 border-green-500 rounded-lg">
              <p className="text-lg font-semibold text-green-800 mb-2">
                Ticket Called Successfully
              </p>
              <div className="text-gray-700">
                <p>
                  <strong>Ticket ID:</strong> #{lastTicket.id}
                </p>
                <p>
                  <strong>Service ID:</strong> {lastTicket.serviceId}
                </p>
                <p>
                  <strong>Taken At:</strong>
                  {dayjs().format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
