import { Document } from "mongoose";

export interface ISubscriber extends Document {
  studentId: string;
  subscriptionDate: string; // Verificar posteriormente se este é o formato
  active: boolean;
}
