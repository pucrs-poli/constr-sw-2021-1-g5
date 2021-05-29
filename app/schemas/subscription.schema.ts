import { model, Schema } from "mongoose";
import { ISubscriber } from "../interfaces/subscriber.interface";

const SubscriberSchema = new Schema({
  studentId: { type: String, required: [true, "Field is required"] },
  subscriptionDate: { type: String, required: [true, "Field is required"] },
  active: { type: Boolean, required: [true, "Field is required"] },
}, {versionKey: 'version'});

export const Subscriber = model<ISubscriber>("subscriptions", SubscriberSchema);
