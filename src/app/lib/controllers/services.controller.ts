import { Service } from '../types/service';
import {ServicesService} from "../services/services.service";



export class ServicesController {
    private servicesService: ServicesService;

    constructor() {
        this.servicesService = new ServicesService();
    }
    //expected this function to be called by a server component, as best practice for next.js
    async getAllServices(): Promise<Service[]> {
        try {
            return await this.servicesService.getAllServices();
        } catch (error) {
            //if this is used by server component the error will be handled by next.js error page
            throw error;
        }
    }

}
