import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
	username: string;
	password_hash: string;
	email: string;
	role: "citizen" | "police" | "admin";
	oauth_provider?: string;
	oauth_id?: string;
	created_at: Date;
	updated_at: Date;
}

const UserSchema: Schema = new Schema({
	username: { type: String, unique: true, required: true },
	password_hash: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	role: {
		type: String,
		enum: ["citizen", "police", "admin"],
		required: true,
	},
	oauth_provider: String,
	oauth_id: String,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
