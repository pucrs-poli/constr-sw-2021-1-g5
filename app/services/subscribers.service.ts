import { ISubscriber } from "../interfaces/subscriber.interface";
import { Subscriber } from "../schemas/subscription.schema";


export class SubscriberService {
    findAll(active?: boolean): Promise<ISubscriber[]> {
        return Subscriber.find(active ? {active} : {}).exec();
    }

    create(subscriber: ISubscriber): Promise<ISubscriber> {
        try {
            Date.parse(subscriber.subscriptionDate);
            return new Subscriber(subscriber).save();
        } catch (error) {
            throw Error(`Invalid date argument while creating subscriber.\n${error}`);
        }
    }

    findById(id: string): Promise<any> {
      return Subscriber.findById(id).exec();
    }

    async update(id: string, subscriber: ISubscriber) {
      const updatedSubscriber = await
        Subscriber.findByIdAndUpdate(id, subscriber).exec();
      if (!updatedSubscriber) {
        throw new Error(`Subscriber with id '${id}' not found`);
      }
      return updatedSubscriber;
    }

    async delete(id: string) {
      const updatedSubscriber = await
        Subscriber.findByIdAndUpdate(id, {active: false}).exec();
      if (!updatedSubscriber) {
        throw new Error(`Subscriber with id '${id}' not found`);
      }
      return updatedSubscriber;
    }
}