import { Router, Request, Response } from "express";
import { EditionService } from "../services/editions.service";
var routesVersioning = require("express-routes-versioning")();

export class EditionsController {
  router = Router();

  constructor(private editionService: EditionService) {
    this.setRoutes();
  }

  private setRoutes() {
    this.router
      .route("/")
      .get(routesVersioning({ "1.0.0": this.getAllEditionsV1 }))
      .post(routesVersioning({ "1.0.0": this.createEditionV1 }));

    this.router
      .route("/:id")
      .get(routesVersioning({ "1.0.0": this.getEditionV1 }))
      .patch(routesVersioning({ "1.0.0": this.updateEditionV1 }))
      .delete(routesVersioning({ "1.0.0": this.deleteEditionV1 }));

    this.router
      .route("/:id/tests")
      .get(routesVersioning({ "1.0.0": this.getEditionTestsV1 }));
  }

  private getEditionV1 = async (request: Request, response: Response) => {
    try {
      const edition = await this.editionService.findById(request.params["id"]);
      response.send(edition);
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  private updateEditionV1 = async (request: Request, response: Response) => {
    try {
      const updateEditionResponse = await this.editionService.update(
        request.params.id,
        request.body
      );
      response.send(updateEditionResponse);
    } catch (e) {
      response.status(500).send(e.message);
    }
  };

  private deleteEditionV1 = async (request: Request, response: Response) => {
    try {
      await this.editionService.delete(request.params.id);
      response.status(204).send();
    } catch (e) {
      response.status(500).send(e.message);
    }
  };

  /**
   * @TODO Precisamos verificar o formato de retorno dos dados desta API com o grupo correspondente
   * @description Busca as avaliações cadastradas para uma determinada disciplina
   * @param request objeto contendo dados sobre a requisição
   * @param response objeto contendo ferramentas para envio de resposta da requisição
   */
  private getEditionTestsV1 = async (
    request: Request,
    response: Response
  ) => {};

  private getAllEditionsV1 = async (request: Request, response: Response) => {
    try {
      const activeFilter = request.query.active as unknown as boolean;
      const editions = await this.editionService.findAll(activeFilter);
      response.send(editions);
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  private createEditionV1 = async (request: Request, response: Response) => {
    try {
      const edition = await this.editionService.create(request.body);
      response.status(201).send(edition);
    } catch (error) {
      response.status(500).send(error.message);
    }
  };
}
