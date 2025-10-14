import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  try {
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

    // Crea alcuni ticket in attesa
    const tickets = await Promise.all([
      prisma.ticket.create({
        data: {
          service_id: services[0].id,
          taken_at: new Date(),
          estimated_waiting_time: "10",
          served: false,
        },
      }),
      prisma.ticket.create({
        data: {
          service_id: services[1].id,
          taken_at: new Date(Date.now() - 60000), // 1 minuto fa
          estimated_waiting_time: "15",
          served: false,
        },
      }),
      prisma.ticket.create({
        data: {
          service_id: services[0].id,
          taken_at: new Date(Date.now() - 120000), // 2 minuti fa
          estimated_waiting_time: "10",
          served: false,
        },
      }),
      prisma.ticket.create({
        data: {
          service_id: services[2].id,
          taken_at: new Date(Date.now() - 180000), // 3 minuti fa
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
        served: t.served,
      }))
    );

    console.log("🎉 Seeding completed successfully!");
    console.log(`\n📊 Summary:`);
    console.log(`   - Services created: ${services.length}`);
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
