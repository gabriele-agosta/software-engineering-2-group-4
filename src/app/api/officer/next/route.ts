import { NextResponse } from "next/server";
import { CounterController } from "@/controllers/counter.controller";
import { ServiceRepository } from "@/repositories/service.repository";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const raw = url.searchParams.get("counter");

    if (!raw) {
      return NextResponse.json({ error: "counter is required" }, { status: 400 });
    }

    const counterId = parseInt((raw.match(/\d+/)?.[0] ?? "").replace(/^0+/, "") || "0", 10);
    if (!counterId) {
      return NextResponse.json({ error: "invalid counter id" }, { status: 400 });
    }

    const controller = new CounterController();
    const result = await controller.callNextCustomer(counterId);

    if (!result.ticket) {
      return NextResponse.json({ ticket: null, message: result.message }, { status: 200 });
    }

    const serviceRepo = new ServiceRepository();
    const services = await serviceRepo.getAllServices();
    const svc = services.find(s => Number(s.id) === Number(result.ticket!.serviceId));

    const ticket = {
      id: String(result.ticket.id),                
      code: String(result.ticket.id),
      service: svc?.name ?? `Service ${result.ticket.serviceId}`,
    };

    return NextResponse.json({ ticket }, { status: 200 });
  } catch (err: any) {
    console.error("[officer/next] error:", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
