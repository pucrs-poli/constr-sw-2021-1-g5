import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

import {
  EditionsController,
  SubscribersRouter,
  PingRouter,
  DocsRouter,
} from "./controllers/index";
import { EditionService } from "./services/editions.service";


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
  
  }

  private registerControllers() {

    const editionsController = new EditionsController(new EditionService());

    App.server.use("/editions", editionsController.router);
    App.server.use("/subscribers", SubscribersRouter);
    App.server.use("/ping", PingRouter);
    App.server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
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
    mongoose.connect(`mongodb://${process.env.DB_DEV_HOST}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }
}

App.getInstance();
