import { Router, Request, Response } from "express";
import UserRepresentation from "keycloak-admin/lib/defs/userRepresentation";
import { App } from "..";

const router: Router = Router();

router.get("/", async (request: Request, response: Response) => {
  const users = await App.kcAdminClient.users.find();
  response.send(users);
});

router.get("/:id", async (request: Request, response: Response) => {
  const users = await App.kcAdminClient.users.findOne({
    id: request.params["id"],
  });
  response.send(users);
});

router.put("/:id", async (request: Request, response: Response) => {
  const userRepresentation: UserRepresentation = request.body;
  const user = await App.kcAdminClient.users.update(
    { id: request.params["id"] },
    userRepresentation
  );
  response.send(user);
});

router.patch("/:id", async (request: Request, response: Response) => {
  const userRepresentation: UserRepresentation = request.body;
  const user = await App.kcAdminClient.users.update(
    { id: request.params["id"] },
    userRepresentation
  );
  response.send(user);
});

router.post("/", async (request: Request, response: Response) => {
  const user = await App.kcAdminClient.users.create(
    request.body as UserRepresentation
  );
  response.send(user);
});

router.delete("/:id", async (request: Request, response: Response) => {
  const users = await App.kcAdminClient.users.del({
    id: request.params["id"],
  });
  response.send(users);
});

export const UsersController: Router = router;
