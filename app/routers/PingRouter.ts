import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (request: Request, response: Response) => {
    response.send('pong');
});

export const PingRouter: Router = router;