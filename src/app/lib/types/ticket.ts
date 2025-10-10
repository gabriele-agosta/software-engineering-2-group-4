export class Ticket {
    constructor(
        public id: number,
        public serviceId: number,
        public takenAt: Date = new Date(),
        public estimatedWaitTime: number = 0,
        public waitingTime: string = "",
        public service_time: string = "",
        public served: boolean = false
    ) {}
}

export class CreateTicketRequest {
    constructor(public serviceId: number) {}
}
