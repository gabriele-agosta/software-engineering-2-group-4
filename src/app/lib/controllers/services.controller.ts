import {ServiceResponse } from '@/schemas/service.schema';
import { ServicesService } from '@/services/services.service';

export class ServicesController {
    private servicesService: ServicesService;

    constructor() {
        this.servicesService = new ServicesService();
    }

    //expected this function to be called by a server component
    async getAllServices(): Promise<ServiceResponse[]> {
        try {
            const services = await this.servicesService.getAllServices();
            
            const response: ServiceResponse[] = services.map(service => ({
                    id: service.id,
                    name: service.name
            }));

            return response;
            
        } catch (error) {
            console.error('[ServicesController] Error getting services:', error);
            //if this is used by server component the error will be handled by next.js error page
            throw new Error('Unable to load services');
        }
    }
}
