import { Router, Request, Response } from "express";
// import { App } from "..";

const router = Router();

router.get("/", async (request: Request, response: Response) => {
    response.send('Root application');
});

export const AppRouter: Router = router;