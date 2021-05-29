import { IEdition } from "../interfaces/edition.interface";
import { Edition } from "../schemas/edition.schema";

export class EditionService {
  findAll(active?: boolean): Promise<IEdition[]> {
    return Edition.find(active ? {active} : {}).exec();
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
    const updatedEdition = await Edition.findByIdAndUpdate(id, {active: false}).exec();

    if (!updatedEdition) {
      throw new Error(`Edition with id '${id}' not found`);
    }

    return updatedEdition;
  }
}
