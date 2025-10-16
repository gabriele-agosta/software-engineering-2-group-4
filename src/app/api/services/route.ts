import { ServicesController } from "@/app/lib/controllers/services.controller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const controller = new ServicesController();
    const services = await controller.getAllServices();
    
    return NextResponse.json({ services });
  } catch (error) {
    console.error("[GET /api/services] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}