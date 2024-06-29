import mongoose, { Schema, Document } from "mongoose";

interface IRole extends Document {
	user_id: mongoose.Types.ObjectId;
	role: "citizen" | "police" | "admin";
	created_at: Date;
}

const RoleSchema: Schema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: "User" },
	role: {
		type: String,
		enum: ["citizen", "police", "admin"],
		required: true,
	},
	created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IRole>("Role", RoleSchema);
