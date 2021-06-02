import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { Request, Response } from "express";
import {
  EditionsController,
  SubscribersController,
  PingRouter
} from "./controllers/index";
import { EditionService } from "./services/editions.service";
import { SubscriberService } from "./services/subscribers.service";
import * as https from "https";

import { NO_ACCESS_TOKEN_GIVEN } from "./constants/constants";

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

export class App {
  private static server: express.Application;
  private static appInstance: App;

  private constructor() {
    App.server = express();
    this.registerMiddlewares();
    this.registerControllers();
    this.setMongoConfig();
    this.listen();
  }

  static getInstance(): App {
    if (!App.appInstance) {
      App.appInstance = new App();
    }
    return App.appInstance;
  }

  private registerMiddlewares() {
    App.server.use(express.json());
    App.server.use(express.urlencoded({ extended: false }));
    App.server.use(this.authorizeEndpoints);
  }

  private authorizeEndpoints = (request: Request, response: Response, next: () => any) => {
    
    const whitelisted = ['/doc', '/doc/', '/ping', '/ping/'];
    
    if (whitelisted.includes(request.path)) {
      next();
      return;
    }
    
    if (request.headers.authorization) {
      // const options = {
      //   host: "https://[keycloakHost]",
      //   port: 8080,
      //   path: `/auth/realms/[realmName]/protocol/openid-connect/userinfo`,
      //   method: "GET",
      //   headers: { Authorization: request.headers.authorization },
      // };
      // https.request(options, (res) => {
      //   console.log("RESPONSE DA CHAMADA AO KEYCLOAK: ", res);
      // });
      next();
    } else {
      response.status(401).json(NO_ACCESS_TOKEN_GIVEN);
    }
  };

  private registerControllers() {
    const editionsController = new EditionsController(new EditionService());
    const subscriptionsController = new SubscribersController(new SubscriberService());

    App.server.use("/editions", editionsController.router);
    App.server.use("/subscribers", subscriptionsController.router);
    App.server.use("/ping", PingRouter);
    App.server.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  private listen() {
    App.server.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (_: any, converted: any) => {
        delete converted._id;
      },
    });
    mongoose.connect(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
  }
}

App.getInstance();
