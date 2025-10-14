"use client";

import { useEffect, useState } from "react";

// I'm leaving this as an example of how to integrate the Call Customer Logic with the GUI
// - Gabriele

interface TicketCall {
  ticket: any;
  counterId: number;
  timestamp: string;
}

export default function DisplayBoard() {
  const [currentCall, setCurrentCall] = useState<TicketCall | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "error"
  >("connecting");

  useEffect(() => {
    const eventSource = new EventSource("/api/tickets/stream");

    eventSource.onopen = () => {
      console.log("SSE connection opened");
      setConnectionStatus("connected");
    };

    eventSource.onmessage = (event) => {
      console.log("Received message:", event.data);
      const data = JSON.parse(event.data);

      if (data.type === "connected") {
        setConnectionStatus("connected");
      }

      if (data.type === "ticket_called") {
        setCurrentCall({
          ticket: data.ticket,
          counterId: data.counterId,
          timestamp: data.timestamp,
        });
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      setConnectionStatus("error");
    };

    return () => {
      console.log("Closing SSE connection");
      eventSource.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            connectionStatus === "connected"
              ? "bg-green-500"
              : connectionStatus === "error"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        ></div>
        <span className="text-sm text-gray-600">
          {connectionStatus === "connected"
            ? "Connected"
            : connectionStatus === "error"
            ? "Disconnected"
            : "Connecting..."}
        </span>
      </div>

      {/* Main Display */}
      <div className="flex items-center justify-center min-h-screen">
        {currentCall ? (
          <div className="text-center animate-fade-in">
            <h1 className="text-6xl font-bold mb-8 text-gray-800">
              NOW SERVING
            </h1>
            <div className="bg-white rounded-3xl shadow-2xl p-16 mb-8">
              <div className="text-9xl font-bold text-blue-600 mb-4">
                #{currentCall.ticket.id}
              </div>
            </div>
            <div className="text-5xl font-semibold text-gray-700">
              Counter {currentCall.counterId}
            </div>
            <div className="text-xl text-gray-500 mt-4">
              {new Date(currentCall.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl text-gray-600 mb-4">
              Waiting for next customer...
            </div>
            <div className="text-lg text-gray-400">Display board ready</div>
          </div>
        )}
      </div>
    </div>
  );
}
