export interface Ticket {
    id: number;
    serviceId: number;
    takenAt: Date;
    estimatedWaitTime: number;
    waitingTime: string;
    service_time: string;
    served: boolean;
}

export interface CreateTicketRequest {
    serviceId: number;
}
