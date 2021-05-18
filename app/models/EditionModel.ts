import { SubscriberModel } from "./SubscriberModel";

export interface EditionModel {
  id: string;
  year: number;
  semester: string;
  subscribers: SubscriberModel[];
  active: boolean;
}
