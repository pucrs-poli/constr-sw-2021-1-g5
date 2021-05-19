import express from "express";
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

import {
  EditionsRouter,
  SubscribersRouter,
  PingRouter,
  DocsRouter,
} from "./routers/index";


export class App {
  private static server: express.Application;
  private static appInstance: App;


  private constructor() {
    App.server = express();
    this.registerMiddlewares();
    this.registerControllers();
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

    App.server.use("/editions", EditionsRouter);
    App.server.use("/subscribers", SubscribersRouter);
    App.server.use("/ping", PingRouter);
    App.server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }


  private listen() {
    const port = 3000;
    App.server.listen(port, () => {
      console.log(`Server listening on port ${port}`);

    });
  }
}

App.getInstance();
