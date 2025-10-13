/*
  Warnings:

  - You are about to drop the column `expected_waiting_time` on the `Service` table. All the data in the column will be lost.
  - Added the required column `expected_service_time` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "expected_waiting_time",
ADD COLUMN     "expected_service_time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "service_time" TEXT;
