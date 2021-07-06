import { Http2ServerRequest } from "http2";
import { IEdition } from "../interfaces/edition.interface";
import { Edition } from "../schemas/edition.schema";
import http from 'http';
import { response } from "express";

export class EditionService {
  findAll(active?: boolean): Promise<IEdition[]> {
    return Edition.find(active ? { active } : {}).exec();
  }

  findEditionTests(id: string) {
    // const options = {
    //   hostname: 'ec2-3-138-183-70.us-east-2.compute.amazonaws.com',
    //   path: `/edition/${id}/tests`,
    //   method: 'GET',
    //   timeout: 10000
    // }
    // let resultado: any;
    
    // http.request(options, res => {
    //   res.setEncoding('utf8');
      
    //   res.on('data', d => {
    //     resultado = d;
    //     // process.stdout.write(d);
    //   })

    //   res.on('end', () => {
    //     console.log("FINISHED: ", resultado);
    //     return resultado;
    //   })

    //   res.on('error', error => {
    //     console.error("ERROR: ", error)
    //   })
    // }).end();
    
    // return new Promise((resolve, reject) => {
    //   resolve(resultado);
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
