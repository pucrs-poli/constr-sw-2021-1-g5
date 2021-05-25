import { model, Schema } from "mongoose";
import { IEdition } from "../interfaces/edition.interface";

const EditionSchema = new Schema({
  year: { type: Number, required: [true, "Field is required"] },
  semester: { type: String, required: [true, "Field is required"] },
  subscribers: { type: Array, required: [false] },
  active: { type: Boolean, required: [true, "Field is required"] },
}, {versionKey: 'version'});

export const Edition = model<IEdition>("editions", EditionSchema);
