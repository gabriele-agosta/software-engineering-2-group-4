"use server";

import { CounterController } from "@/controllers/counter.controller";
import { CallNextCustomerResponse } from "@/schemas/counter.schema";

export async function callNextCustomer(
  counterId: number
): Promise<CallNextCustomerResponse> {
  try {
    const controller = new CounterController();
    const result = await controller.callNextCustomer(counterId);

    return result;
  } catch (error) {
    console.error("[callNextCustomer] FULL ERROR:", error);
    console.error(
      "[callNextCustomer] Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return {
      ticket: null,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while calling the next customer",
    };
  }
}
