import express from "express";
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
    App.server.use("/docs", DocsRouter);
    App.server.use("/ping", PingRouter);
  }

  private listen() {
    const port = 3000;
    App.server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

App.getInstance();
