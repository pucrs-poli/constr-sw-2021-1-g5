import { Router, Request, Response } from "express";
import { SubscriberService } from "../services/subscribers.service";

export class SubscribersController {
    router = Router();

    // constructor() {
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
    }

    private postSubscriber = async (request: Request, response: Response) => {
        try {
            const subscriber = await this.subscriberService.create(request.body);
            response.status(201).send(subscriber);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    private getSubscriber = async (request: Request, response: Response) => {
        try {
            const subscriber = await this.subscriberService.findById(request.params["id"]);
            response.send(subscriber);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    private deleteSubscriber = async (request: Request, response: Response) => {
        try {
            await this.subscriberService.delete(request.params.id);
            response.status(204).send();
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    private getSubscriberResults = async (request: Request, response: Response) => {
        try {
            const result = await
                this.subscriberService.findById(request.params["id"])
            /// TODO:  pegar resultado do subscriber
            response.send(result);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    private getAllSubscribers = async (request: Request, response: Response) => {
        try {
            const subscriber = await this.subscriberService.create(request.body);
            response.status(201).send(subscriber);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }
}
