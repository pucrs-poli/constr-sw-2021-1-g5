import { Router, Request, Response } from "express";
// import { App } from "..";

const router = Router();

const editionsPath = '/editions';
const evaluationsPath = '/evaluations';
const subscribersPath = '/subscribers';
const resultsPath = '/results';
const idInput = ':id';


router.get("/", async (request: Request, response: Response) => {
    response.send('Root application');
});



export const AppRouter: Router = router;