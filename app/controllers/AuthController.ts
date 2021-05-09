import { Router, Request, Response } from "express";
import { App } from "..";

const router: Router = Router();

router.post("/", async (request: Request, response: Response) => {
  await App.kcAdminClient.auth({
    username: request.body.username,
    password: request.body.password,
    grantType: request.body.grantType,
    clientId: request.body.clientId,
    clientSecret: request.body.clientSecret
  });

  const responseObj = {
      access_token: App.kcAdminClient.accessToken,
      refresh_token: App.kcAdminClient.refreshToken,
  };
  response.send(responseObj);
});

export const AuthController: Router = router;
