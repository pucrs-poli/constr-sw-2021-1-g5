import express from "express";
import { AppRouter } from './controller/router'
import { EditionsRouter } from './controller/Editions'
import { SubscribersRouter } from './controller/Subscribers'

export class App {
  private static server: express.Application;
  private static appInstance: App;
  private static port = 3000;

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
    App.server.use('/', AppRouter);
    App.server.use('/editions', EditionsRouter);
    App.server.use('/subscribers', SubscribersRouter);
  }

  private listen() {
    const port = App.port;
    App.server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

const instance = App.getInstance();
