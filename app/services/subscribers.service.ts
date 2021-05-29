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
        return Subscriber.findOne({ studentId: id }).exec();
    }

    async update(id: string, subscriber: ISubscriber) {
        const updatedSubscriber = await
            Subscriber.findOneAndUpdate({'studentId':id}, subscriber).exec()
        if (!updatedSubscriber) {
            throw new Error(`Subscriber with id '${id}' not found`);
        }
        return updatedSubscriber;
    }
// , {active:false}
    async delete(id: string) {
        const updatedSubscriber = await
            Subscriber.findOneAndDelete({'studentId':id}).exec();
        if (!updatedSubscriber) {
            throw new Error(`Subscriber with id '${id}' not found`);
        }
        return updatedSubscriber;
    }
}