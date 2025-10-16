-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "assigned_at" TIMESTAMP(3),
ADD COLUMN     "counter_id" BIGINT;

-- CreateTable
CREATE TABLE "Counter" (
    "id" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_counter_id_fkey" FOREIGN KEY ("counter_id") REFERENCES "Counter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
