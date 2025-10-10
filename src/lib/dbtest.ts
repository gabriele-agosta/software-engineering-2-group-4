import type { Ticket, Service, Prisma } from "@prisma/client";

const service: Service = {
  //if everithing works, you should be able to see the Service type structure
  // overing the type definition on the previous row
  name: "service",
  id: 1n,
  expected_service_time: "10 minutes"
};

const ticket: Ticket = {
  //if everithing works, you should be able to see the Ticket type structure
  // overing the type definition on the previous row
  id: 1n,
  service_id: 1n,
  taken_at: new Date(),
  estimated_waiting_time: "10 minutes",
  waiting_time: null,
  service_time: null,
  served: false,
};
