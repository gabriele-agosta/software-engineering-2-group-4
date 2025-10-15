import { prisma } from '@/db';
import { Service } from '@/schemas/service.schema';

export class ServiceRepository {
    async getAllServices(): Promise<Service[]> {
        try {
            const services = await prisma.service.findMany();
            
            return services.map((service) => ({
                id: service.id,
                name: service.name,
                expectedWaitTime: service.expected_service_time
            }));
        } catch (error) {
            console.error('[ServiceRepository] Database error:', error);
            throw new Error('Failed to fetch services from database');
        }
    }
}