import { Service } from '@/schemas/service.schema';
import { ServiceRepository } from '@/repositories/service.repository';

export class ServicesService {
    private serviceRepository: ServiceRepository;

    constructor() {
        this.serviceRepository = new ServiceRepository();
    }

    async getAllServices(): Promise<Service[]> {
        try {
            const services = await this.serviceRepository.getAllServices();
            //basic logic validation, to be reduced or not it depends on the frontend validation, or testing

            if (!services || services.length === 0) {
                console.warn('[ServicesService] No services found in database');
                return [];
            }
            

            const validServices = services.filter(service => 
                service.name && 
                service.name.trim() !== '' &&
                service.expectedWaitTime !== null
            );
            
            return validServices;
            
        } catch (error) {
            console.error('[ServicesService] Error getting services:', error);
            throw new Error('Unable to retrieve services');
        }
    }
}
