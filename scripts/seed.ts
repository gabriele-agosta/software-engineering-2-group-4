import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  try {
    // Pulizia (cancellare prima i ticket per rispetto delle FK)
    await prisma.ticket.deleteMany();
    await prisma.counter.deleteMany();
    await prisma.service.deleteMany();
    console.log("🧹 Cleared existing data");

    // Crea servizi
    const services = await Promise.all([
      prisma.service.create({
        data: {
          name: "General Inquiry",
          expected_service_time: "10",
        },
      }),
      prisma.service.create({
        data: {
          name: "Document Processing",
          expected_service_time: "15",
        },
      }),
      prisma.service.create({
        data: {
          name: "Account Management",
          expected_service_time: "20",
        },
      }),
    ]);

    console.log(
      "✅ Services created:",
      services.map((s) => ({ id: Number(s.id), name: s.name }))
    );

    // Crea counters (sportelli)
    const counters = await Promise.all([
      prisma.counter.create({ data: { active: true } }),
      prisma.counter.create({ data: { active: true } }),
    ]);

    console.log(
      "✅ Counters created:",
      counters.map((c) => ({ id: Number(c.id), active: c.active }))
    );

    // Crea alcuni ticket in attesa (alcuni assegnati ad un counter, altri no)
    const now = new Date();
    const tickets = await Promise.all([
      prisma.ticket.create({
        data: {
          service_id: services[0].id,
          taken_at: now,
          estimated_waiting_time: "10",
          served: false,
        },
      }),
      prisma.ticket.create({
        data: {
          service_id: services[1].id,
          taken_at: new Date(now.getTime() - 60_000), // 1 minuto fa
          estimated_waiting_time: "15",
          served: false,
        },
      }),
      prisma.ticket.create({
        data: {
          service_id: services[0].id,
          taken_at: new Date(now.getTime() - 120_000), // 2 minuti fa
          estimated_waiting_time: "10",
          served: false,
        },
      }),
      prisma.ticket.create({
        data: {
          service_id: services[2].id,
          taken_at: new Date(now.getTime() - 180_000), // 3 minuti fa
          estimated_waiting_time: "20",
          served: false,
        },
      }),
    ]);

    console.log(
      "✅ Tickets created:",
      tickets.map((t) => ({
        id: Number(t.id),
        serviceId: Number(t.service_id),
        counterId: t.counter_id ? Number(t.counter_id) : null,
        served: t.served,
      }))
    );

    console.log("🎉 Seeding completed successfully!");
    console.log(`\n📊 Summary:`);
    console.log(`   - Services created: ${services.length}`);
    console.log(`   - Counters created: ${counters.length}`);
    console.log(`   - Tickets created: ${tickets.length}`);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
