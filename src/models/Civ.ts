import mongoose from "mongoose";

/** Example Civ Document
 * {
  "_id": {
    "$oid": "68f38af72a971427f81e201a"
  },
  "name": "Armenians",
  "unique_unit": "Composite Bowman;Elite Composite Bowman;Warrior Priest",
  "unique_tech": "Cilician Fleet;Fereters",
  "team_bonus": "Infantry have +2 Line of Sight.",
  "civilization_bonus": "Mule Carts cost -25%;Mule Cart technologies are 25% more effective",
  "image": "armenians",
  "unique_buildings": "Fortified Church",
  "expansion": "The Mountain Royals",
  "army_type": "Infantry and Naval (local)",
  "id": "750c1631-4280-457d-983a-b92960f6c1b5"
 */

const civSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    unique_unit: { type: String, required: true },
    unique_tech: { type: String, required: true },
    team_bonus: { type: String, required: true },
    civilization_bonus: { type: String, required: true },
    image: { type: String, required: true },
    unique_buildings: { type: String },
    expansion: { type: String, required: true },
    army_type: { type: String, required: true },
}, { timestamps: true });

export type CivType = mongoose.InferSchemaType<typeof civSchema>;

export default mongoose.models.Civ || mongoose.model("Civ", civSchema);



