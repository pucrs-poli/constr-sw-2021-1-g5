import { Router, Request, Response } from "express";
import { SubscriberService } from "../services/subscribers.service";
const routesVersioning = require("express-routes-versioning")();

export class SubscribersController {
    router = Router();

    constructor(private subscriberService: SubscriberService) {
        this.setRoutes();
    }
    
    private setRoutes() {
        this.router
            .route('/')
            .get(routesVersioning({ "1.0.0": this.getAllSubscribers}))
            .post(routesVersioning({ "1.0.0": this.postSubscriber}));

        this.router
            .route('/:id')
            .get(routesVersioning({ "1.0.0": this.getSubscriber}))
            .delete(routesVersioning({ "1.0.0": this.deleteSubscriber}));

        this.router
            .route('/:id/results')
            .get(routesVersioning({ "1.0.0": this.getSubscriberResultsV1}));

        this.router
            .route('/student/:id')
            .get(routesVersioning({ "1.0.0": this.getByStudentId}));
    }

    /*  
    *   =====================
    *       Route '/:id'
    *   =====================
    */

    private getSubscriber = async (request: Request, response: Response) => {
        try {
            const subscriber = await this.subscriberService.findById(request.params["id"]);
            if (subscriber) {
                response.send(subscriber);
            } else {
                response.status(404).send('No such subscription exists');
            }
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    private deleteSubscriber = async (request: Request, response: Response) => {
        try {
            const subscriber = await this.subscriberService.delete(request.params.id);
            response.status(200).send(subscriber);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    /*  
    *   =====================
    *    Route '/:id/results'
    *   =====================
    */

    private getSubscriberResultsV1 = async (request: Request, response: Response) => {
        try {
            // const results = await this.subscriberService
            const results = await this.subscriberService.findSubscriberResults(request.params.id);
            response.status(200).send(results);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    /*  
    *   =====================
    *       Route '/'
    *   =====================
    */
   
    private getAllSubscribers = async (request: Request, response: Response) => {
        try {
            const activeFilter = request.query.active as unknown as boolean;
            const subscribers = await this.subscriberService.findAll(activeFilter);
            response.send(subscribers);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    private postSubscriber = async (request: Request, response: Response) => {
        try {
            const subscriber = await this.subscriberService.create(request.body);
            response.status(201).send(subscriber);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    /*  
    *   =====================
    *   Route '/student/results'
    *   =====================
    */

    private getByStudentId = async (request: Request, response: Response) => {
        try {
            const subscriber = await this.subscriberService.findByStudentId(request.params["id"]);
            if (subscriber) {
                response.send(subscriber);
            } else {
                response.status(404).send('No such subscription exists');
            }
        } catch (error) {
            response.status(500).send(error.message);
        }
    }
}
