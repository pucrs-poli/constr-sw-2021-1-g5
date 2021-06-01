import { IEdition } from "../interfaces/edition.interface";
import { Edition } from "../schemas/edition.schema";

export class EditionService {
  findAll(active?: boolean): Promise<IEdition[]> {
    return Edition.find(active ? { active } : {}).exec();
  }

  /**
   * @TODO Quando o grupo 8 subir a API para a AWS, devemos remover o mock
   * e descomentar a chamada HTTPS
   * @param id
   */
  findEditionTests(id: string) {
    // const options = {
    //   host: "endpoint-grupo",
    //   port: 8080,
    //   path: `/tests`,
    //   method: "GET",
    //   headers: { Authorization: request.headers.authorization },
    // };
    // https.request(options, (res) => {
    //   console.log("RESPONSE DA CHAMADA A API EXTERNA: ", res);
    // });
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
          subjects: ["Web development", "Design Patterns"],
          weight: 2,
          duration: 1.3,
          questions: [{}],
          results: [{}],
        },
        {
          id: "bb119b5a-c279-11eb-8529-0242ac130003",
          subjects: ["OOP", "Reactive programming"],
          weight: 3,
          duration: 1.3,
          questions: [{}],
          results: [{}],
        },
      ]);
    });
  }

  create(edition: IEdition): Promise<IEdition> {
    return new Edition(edition).save();
  }

  findById(id: string): Promise<any> {
    return Edition.findById(id).exec();
  }

  async update(id: string, edition: IEdition) {
    const updatedEdition = await Edition.findByIdAndUpdate(id, edition).exec();

    if (!updatedEdition) {
      throw new Error(`Edition with id '${id}' not found`);
    }

    return updatedEdition;
  }

  async delete(id: string) {
    const updatedEdition = await Edition.findByIdAndUpdate(id, {
      active: false,
    }).exec();

    if (!updatedEdition) {
      throw new Error(`Edition with id '${id}' not found`);
    }

    return updatedEdition;
  }
}
