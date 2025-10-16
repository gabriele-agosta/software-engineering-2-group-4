import { createTicket } from "@/app/lib/actions/tickets";
import { CreateTicketRequestSchema } from "@/app/lib/schemas/ticket.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = CreateTicketRequestSchema.parse(body);
    
    const ticket = await createTicket(validatedData.serviceId);
    
    return NextResponse.json({ ticket });
  } catch (error) {
    console.error("[POST /api/tickets] Error:", error);
    
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}