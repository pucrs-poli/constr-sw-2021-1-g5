import { Router, Request, Response } from "express";
import { SubscriberService } from "../services/subscribers.service";

export class SubscribersController {
    router = Router();

    constructor(private subscriberService: SubscriberService) {
        this.setRoutes();
    }

    private setRoutes() {
        this.router.route('/')
            .get(this.getAllSubscribers)
            .post(this.postSubscriber);

        this.router.route('/:id')
            .get(this.getSubscriber)
            .delete(this.deleteSubscriber);

        this.router.route('/:id/results')
            .get(this.getSubscriberResults);

        this.router.route('/student/:id')
            .get(this.getByStudentId);
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

    private getSubscriberResults = async (request: Request, response: Response) => {
        /// TODO:
        response.status(204).send('Not today');
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
