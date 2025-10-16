"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { CreateTicketResponse } from "@/app/lib/schemas/ticket.schema";
import { ServiceResponse } from "@/app/lib/schemas/service.schema";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface TicketDisplay {
  id: number;
  number: string;
  serviceName: string;
  timestamp: Date;
}

// API endpoint constants
const API_ENDPOINTS = {
  SERVICES: '/api/services',
  TICKETS: '/api/tickets',
} as const;

export default function GetTicketPage() {
  const router = useRouter();
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [ticket, setTicket] = useState<TicketDisplay | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(true);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch services on component mount with useCallback for better performance
  const fetchServices = useCallback(async () => {
    try {
      setIsLoadingServices(true);
      setError(null);
      
      const response = await fetch(API_ENDPOINTS.SERVICES, {
        method: 'GET',
        cache: 'no-store', // Next.js specific - ensures fresh data
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.services || !Array.isArray(data.services)) {
        throw new Error('Invalid services data format');
      }
      
      setServices(data.services);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to load services: ${errorMessage}`);
      console.error('Error fetching services:', err);
    } finally {
      setIsLoadingServices(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Helper function for resetting state
  const resetToServiceSelection = useCallback(() => {
    setTicket(null);
    setError(null);
  }, []);

  // Helper function for retrying service fetch
  const retryFetchServices = useCallback(() => {
    setError(null);
    fetchServices();
  }, [fetchServices]);

  const handleServiceSelect = useCallback(async (service: ServiceResponse) => {
    setIsLoading(true);
    setSelectedService(service.id);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.TICKETS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceId: service.id }),
        cache: 'no-store', // Next.js specific - no caching for POST requests
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.ticket) {
        throw new Error('Invalid ticket data received');
      }
      
      const ticketData = data.ticket;

      // Create display ticket with formatted number
      const displayTicket: TicketDisplay = {
        id: ticketData.id,
        number: `T-${String(ticketData.id).padStart(3, '0')}`,
        serviceName: service.name,
        timestamp: new Date(),
      };

      setTicket(displayTicket);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to create ticket: ${errorMessage}`);
      console.error('Error creating ticket:', err);
    } finally {
      setIsLoading(false);
      setSelectedService(null);
    }
  }, []);

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
              Service: {ticket.serviceName}
            </h5>
            <p className="card-text">
              <small>Issued at: {ticket.timestamp.toLocaleTimeString()}</small>
            </p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-secondary w-100"
              onClick={resetToServiceSelection}
            >
              Get Another Ticket
            </button>
          </div>
        </div>
      </main>
    );
  }

  // === UI Part 2: Show the list of services as consistent cards ===
  
  if (isLoadingServices) {
    return (
      <main className="container my-5">
        <LoadingSpinner text="Loading services..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container my-5">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Oops! Something went wrong</h4>
            <p>{error}</p>
            <hr />
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button 
                className="btn btn-primary" 
                onClick={retryFetchServices}
                disabled={isLoadingServices}
              >
                {isLoadingServices ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Retrying...
                  </>
                ) : (
                  'Try Again'
                )}
              </button>
              <Link href="/" className="btn btn-outline-secondary">
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
                <p className="card-text text-muted">Select this service to get your ticket</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleServiceSelect(service)}
                    disabled={isLoading}
                  >
                    {isLoading && selectedService === service.id ? (
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
