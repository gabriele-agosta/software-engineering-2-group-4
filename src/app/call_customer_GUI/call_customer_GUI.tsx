import { useEffect, useState } from "react";
import Call_Customer_Row from "./call_customer_row";

import "bootstrap/dist/css/bootstrap.min.css";


export type Mesg = {
  ticket: {
    ticket: {
      id: number;
      serviceId: number;
    } | null;
    message: string;
  };
  counterId: number;
  timestamp: string;
};

export default function Call_Customer_GUI() {

    const [tickets, setTickets] = useState<Mesg[]>([{
        ticket: {
            ticket: {
                id: 1,
                serviceId: 1
            },
            message: "a"
        },
        counterId: 1,
        timestamp: ""
    },
    {
        ticket: {
            ticket: {
                id: 2,
                serviceId: 1
            },
            message: "a"
        },
        counterId: 2,
        timestamp: ""
    }]);//ticket inserted to try the layout: to remove before deploy

    useEffect(() => {
        const eventSource = new EventSource("/api/notifications");

        eventSource.onopen = () => console.log("✅ Connection opened (SSE)");
    
        eventSource.onmessage = (event) => {
            console.log("📩 New message:", event.data);
            const newTicket :Mesg = JSON.parse(event.data);
            if(newTicket.ticket !== null && newTicket.ticket.ticket !== null)
                setTickets(prev => [newTicket, ...prev].slice(0, 4));
        };

        eventSource.onerror = (err) => {
            console.error("❌ SSE error", err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);


return (
    <div>
        <div className="d-flex justify-content-around w-100 fs-1 border-bottom py-2">
            <div>Desk n.</div>
            <div>Service n.</div>
            <div>Ticket n.</div>
        </div>
        <table className="table table-bordered text-center fs-1 w-100">
            <tbody>
                {tickets.map((p, idx) => (
                    <Call_Customer_Row
                        key={p.ticket.ticket?.id ?? idx}
                        ticket={p.ticket}
                        counterId={p.counterId}
                        timestamp={p.timestamp}
                    />
                ))}
            </tbody>
        </table>
    </div>
  );
}
