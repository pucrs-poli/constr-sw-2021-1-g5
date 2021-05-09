import "dotenv/config";
import express from "express";
import { UsersController } from "./controllers/UsersController";
import KcAdminClient from "keycloak-admin";
import { AuthController } from "./controllers/AuthController";

export class App {
  private static server: express.Application;
  private static appInstance: App;
  static kcAdminClient: KcAdminClient;

  private constructor() {
    App.server = express();
    App.kcAdminClient = new KcAdminClient();
    this.registerMiddlewares();
    this.registerControllers();
    this.configKeycloakClient();
    this.listen();
  }

  static getInstance(): App {
    if (!App.appInstance) {
      App.appInstance = new App();
    }
    return App.appInstance;
  }

  private async configKeycloakClient() {
    App.kcAdminClient.setConfig({
      realmName: "master",
      baseUrl: "http://3.15.140.59:8080/auth",
    });
  }

  private registerMiddlewares() {
    App.server.use(express.json());
    App.server.use(express.urlencoded({ extended: false }));
  }

  private registerControllers() {
    App.server.use("/users", UsersController);
    App.server.use("/auth", AuthController);
  }

  private listen() {
    const port = process.env.PORT;
    App.server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

const instance = App.getInstance();
