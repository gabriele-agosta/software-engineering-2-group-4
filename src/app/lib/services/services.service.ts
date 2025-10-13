
import { Service } from '@/types/service';

export class ServicesService {
    async getAllServices(): Promise<Service[]> {
        // Logic to fetch all services, mocked until db implementation, will call the repository and return all services without waiting time
        return new Promise((resolve) => {
            const services: Service[] = [
                { id: 1, name: "Service 1" },
                { id: 2, name: "Service 2" },
                { id: 3, name: "Service 3" } // No expected wait time
            ];
            resolve(services);

            //will add a try catch here when the repository will be implemented
        });
    }
}