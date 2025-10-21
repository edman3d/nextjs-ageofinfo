import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    expansion: { type: String, required: true },
    age: {
        type: String,
        enum: ["N/A", "Dark", "Feudal", "Castle", "Imperial"],
        required: true,
    },
    created_in: { type: String, required: true },
    // e.g. "{\"Wood\": 25,\"Gold\": 45}"
    cost: {
        type: String,
        get: (v: string) => { try { return JSON.parse(v); } catch { return []; } },
        set: (v: any) => JSON.stringify(v),
    },
    build_time: { type: String, required: true },
    reload_time: { type: Number, required: true },
    attack_delay: { type: Number, required: true },
    movement_rate: { type: Number, required: true },
    line_of_sight: { type: Number, required: true },
    hit_points: { type: Number, required: true },
    min_range: { type: Number, required: true },
    max_range: { type: Number, required: true },
    attack: { type: Number, required: true },
    melee_armor: { type: Number, required: true },
    ranged_armor: { type: Number, required: true },
    // e.g. "[{\"amount\": 3, \"against\": \"Spearmen\"}]"
    attack_bonus: {
        type: String,
        get: (v: string) => { try { return JSON.parse(v); } catch { return []; } },
        set: (v: any) => JSON.stringify(v),
    },
    armor_bonus: {
        type: String,
        get: (v: string) => { try { return JSON.parse(v); } catch { return []; } },
        set: (v: any) => JSON.stringify(v),
    },
    search_radius: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    blast_radius: { type: Number, required: true },
    image: { type: String, required: true },
    type: {
        type: String,
        enum: ["Cheat", "Civilian", "Gaia", "Military", "Navy", "Unbuildable"],
        required: true,
    },
    armor_class: { type: String, required: true },
    special: { type: String },
}, { timestamps: true });

export type UnitType = mongoose.InferSchemaType<typeof unitSchema>;

export default mongoose.models.Unit || mongoose.model("Unit", unitSchema);