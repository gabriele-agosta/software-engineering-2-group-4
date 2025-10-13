-- CreateTable
CREATE TABLE "Service" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "expected_waiting_time" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" BIGSERIAL NOT NULL,
    "service_id" BIGINT NOT NULL,
    "taken_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimated_waiting_time" TEXT NOT NULL,
    "waiting_time" TEXT,
    "served" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
