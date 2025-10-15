"use client";

import { useState } from "react";
import Link from "next/link";

// A type definition for what a ticket object will look like.
type Ticket = {
  number: string;
  service: string;
  timestamp: Date;
};

// Mock services list...
const services = [
  {
    id: 1,
    name: "General Inquiries",
    description:
      "For questions about your account, statements, or our products.",
  },
  {
    id: 2,
    name: "New Account",
    description: "Open a new checking, savings, or investment account with us.",
  },
  {
    id: 3,
    name: "Card Services",
    description:
      "Help with your debit/credit card, including activation or disputes.",
  },
  {
    id: 4,
    name: "Loan Department",
    description:
      "Speak with a specialist about mortgages, auto, or personal loans.",
  },
  {
    id: 5,
    name: "Wealth Management",
    description:
      "Consult with our financial advisors for investment and planning.",
  },
  {
    id: 6,
    name: "Business Banking",
    description: "Services for our corporate and small business clients.",
  },
];

export default function GetTicketPage() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  /**
   * PLACEHOLDER LOGIC: Simulates generating a ticket.
   */
  const handleServiceSelect = (serviceName: string) => {
    setIsLoading(true);
    setSelectedService(serviceName); // Keep track of which service is loading

    setTimeout(() => {
      const mockTicket: Ticket = {
        number: `C-${String(Math.floor(Math.random() * 900) + 100)}`,
        service: serviceName,
        timestamp: new Date(),
      };
      setTicket(mockTicket);
      setIsLoading(false);
      setSelectedService(null); // Reset after loading
    }, 500);
  };

  // === UI Part 1: Show the generated ticket ===
  if (ticket) {
    return (
      <main className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card text-center shadow" style={{ width: "25rem" }}>
          <div className="card-header bg-success text-white">
            Your Ticket Is Ready
          </div>
          <div className="card-body">
            <p className="card-text">Please proceed to the waiting area.</p>
            <h1 className="display-1 fw-bold my-4">{ticket.number}</h1>
            <h5 className="card-subtitle mb-2 text-muted">
              Service: {ticket.service}
            </h5>
            <p className="card-text">
              <small>Issued at: {ticket.timestamp.toLocaleTimeString()}</small>
            </p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-secondary w-100"
              onClick={() => setTicket(null)}
            >
              Get Another Ticket
            </button>
          </div>
        </div>
      </main>
    );
  }

  // === UI Part 2: Show the list of services as consistent cards ===
  return (
    <main className="container my-5">
      <div className="text-center mb-4">
        <h1 className="display-5">Get a Ticket</h1>
        <p className="lead">Please select a service to join the queue.</p>
      </div>

      <div className="d-flex justify-content-center mb-5">
        <Link href="/" className="btn btn-outline-secondary">
          &larr; Back to Role Selection
        </Link>
      </div>

      {/* --- START: Card layout consistent with the home page --- */}
      <div className="row g-4 justify-content-center">
        {services.map((service) => (
          // Updated grid classes here
          <div key={service.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title h2">{service.name}</h5>
                <p className="card-text text-muted">{service.description}</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleServiceSelect(service.name)}
                    disabled={isLoading}
                  >
                    {isLoading && selectedService === service.name ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Generating...
                      </>
                    ) : (
                      "Get Ticket"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* --- END: Card layout --- */}
    </main>
  );
}
