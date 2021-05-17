import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (request: Request, response: Response) => {
    response.send('All registered editions');
});

router.post("/", async (request: Request, response: Response) => {
    var newEdition;
    var responseMessage;
    try {
        newEdition = request.body['edition'];
        console.log(`Received post data: ${newEdition}`);
        response.status(201);
        responseMessage = 'Feedback data here';
    } catch (error) {
        console.log(`ERROR at POST EDITION\n${error}`);
        response.status(400);
        responseMessage = 'Error occurred.';
    }
    response.send(responseMessage);
});

router.get("/:id", async (request: Request, response: Response) => {
    var editionId;
    try {
        editionId = request.params['id'];
        console.log(`Received edition id: ${editionId}`);
    } catch (error) {
        console.log(`ERROR getting an EDITION\n${error}`);
        response.status(400);
    }
    response.send();
});

router.patch("/:id", async (request: Request, response: Response) => {
    var id;
    var body;
    try {
        id = request.params['id'];
        body = request.body['edition'];
        console.log(`Received edition id: ${id}`);
        console.log(`Body: ${body}`);
    } catch (error) {
        console.log(`ERROR at PATCH EDITION\n${error}`);
        response.status(400);
    }
});

router.get("/:id/evaluations", async (request: Request, response: Response) => {
    var id;
    try {
        id = request.params['id'];
        console.log(`Received edition id: ${id}`);
        response.send('Edition evaluations');
    } catch (error) {
        console.log(`ERROR at GET EDITION EVALUATION\n${error}`);
        response.status(400);
        response.send;
    }
});

export const EditionsRouter: Router = router;