// import { InferSchemaType, model, Schema } from "mongoose";

// const civSchema = new Schema({
//     _id: { type: Schema.Types.ObjectId, required: true },
//     team_bonus: { type: String, required: true },
//     army_type: { type: String },
// }, { timestamps: true });

// type Civ = InferSchemaType<typeof civSchema>;

// export default model<Civ>("Civ", civSchema);

import mongoose from "mongoose";

// export interface CivInterface {
//     name: string;
//     team_bonus: string;
//     army_type: string;
// }

const civSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    team_bonus: { type: String, required: true },
    army_type: { type: String, required: true },
}, { timestamps: true });

export type CivType = mongoose.InferSchemaType<typeof civSchema>;

export default mongoose.models.Civ || mongoose.model("Civ", civSchema);

