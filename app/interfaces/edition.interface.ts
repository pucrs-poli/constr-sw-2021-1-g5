import { Document } from "mongoose";
import { ISubscriber } from "./subscriber.interface";

export interface IEdition extends Document {
  year?: number;
  semester?: string;
  subscribers?: ISubscriber[];
  active?: boolean;
}