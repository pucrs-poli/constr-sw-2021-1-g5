import { ISubscriber } from "../interfaces/subscriber.interface";
import { Subscriber } from "../schemas/subscription.schema";


export class SubscriberService {
    findAll(active?: boolean): Promise<ISubscriber[]> {
        return Subscriber.find(active ? { active } : {}).exec();
    }

    create(subscriber: ISubscriber): Promise<ISubscriber> {
        try {
            Date.parse(subscriber.subscriptionDate);
            return new Subscriber(subscriber).save();
        } catch (error) {
            throw Error(`Invalid argument while creating subscriber.\n${error}`);
        }
    }

    findById(id: string): Promise<any> {
        return Subscriber.findById(id).exec();
    }

    findByStudentId(id: string): Promise<any> {
        return Subscriber.find({ studentId: id }).exec();
    }

    async update(id: string, subscriber: ISubscriber) {
        const updatedSubscriber = await
            Subscriber.findOneAndUpdate({'studentId':id}, subscriber).exec()
        if (!updatedSubscriber) {
            throw new Error(`Subscriber with id '${id}' not found`);
        }
        return updatedSubscriber;
    }

    async delete(id: string) {
        const updatedSubscriber = await
            Subscriber.findByIdAndDelete(id).exec();
        if (!updatedSubscriber) {
            throw new Error(`Subscriber with id '${id}' not found`);
        }
        return updatedSubscriber;
    }

    findSubscriberResults(id: String): Promise<any> {
        // Grab all test IDs
        // var testIds = [];
        // const options = {
        //   host: "base-url",
        //   port: 8080,
        //   path: `/subscribers/${id}/results`,
        //   method: "GET",
        //   headers: { Authorization: request.headers.authorization },
        // };
        // https.request(options, (res) => {
        //   console.log("RESPONSE DA CHAMADA A API EXTERNA: ", res);
        //   testIds = res.body;
        // });
        // if (testIds == null || testIds.length == 0) { return null; }
        // Grab all tests
        // var tests = [];
        // testIds = [1, 2, 3];
        // for(let i in testIds) {
        //     const options = {
        //         host: "base-url",
        //         port: 8080,
        //         path: `/test/${testIds[i]}`,
        //         method: "GET",
        //         headers: { Authorization: request.headers.authorization },
        //     };
        //     try {
        //         http.request(options, (response) = {
        //             if (response.body.isEmpty) { continue; }
        //             tests.push(response.body);
        //         });
        //     } catch (error) { }
        // }
        // return tests;

        return new Promise((resolve, reject) => {
            resolve([
                {
                    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
                    "subjects": [
                      "Web development",
                      "Design Patterns"
                    ],
                    "weight": 2,
                    "duration": 1.3,
                    "questions": [
                      {}
                    ],
                    "results": [
                      {}
                    ]
                  },
                  {
                      "id": "d290f1ee-6c54-gb89-90e6-d701748f0851",
                      "subjects": [
                        "iOS Arquitectures",
                        "Design Patterns"
                      ],
                      "weight": 3,
                      "duration": 2,
                      "questions": [
                        {}
                      ],
                      "results": [
                        {}
                      ]
                    },
            ])
        });
    }
}