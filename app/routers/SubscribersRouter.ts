import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (request: Request, response: Response) => {
    response.send('All subscribers');
});
/**
 * Teste
 */
router.get("/:id", async (request: Request, response: Response) => {
    var id;
    try {
        id = request.params['id'];
        console.log(`Received subscriber id: ${id}`);
        response.send(`Subscribers of ${id}: []`);
    } catch (error) {
        console.log(`ERROR at GET SUBSCRIBER\n${error}`);
        response.status(400);
    }
});

router.delete("/:id", async (request: Request, response: Response) => {
    const subscriberId = request.params['id'];
    try {
        response.send(`Removing subscriber ${subscriberId}`);
    } catch (error) {
        console.log(`ERROR at GET SUBSCRIBER\n${error}`);
        response.status(400);
    }
});

router.get("/:id/results", async (request: Request, response: Response) => {
    var id;
    try {
        id = request.params['id'];
        console.log(`Received subscriber id: ${id}`);
        response.send(`Results of subscriber @${id}: []`);
    } catch (error) {
        console.log(`ERROR at GET SUBSCRIBER RESULTS\n${error}`);
        response.status(400);
    }
});

export const SubscribersRouter: Router = router;