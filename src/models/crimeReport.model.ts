import mongoose, { Schema, Document } from "mongoose";

interface ICrimeReport extends Document {
	user_id: mongoose.Types.ObjectId;
	type: string;
	description: string;
	location: { type: string; coordinates: [number, number] };
	timestamp: Date;
	media_url?: string;
	is_anonymous: boolean;
	created_at: Date;
	updated_at: Date;
}

const CrimeReportSchema: Schema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: "User" },
	type: { type: String, required: true },
	description: { type: String, required: true },
	location: {
		type: { type: String, enum: ["Point"], required: true },
		coordinates: { type: [Number], required: true },
	},
	timestamp: { type: Date, required: true },
	media_url: String,
	is_anonymous: { type: Boolean, default: false },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

CrimeReportSchema.index({ location: "2dsphere" });

export default mongoose.model<ICrimeReport>("CrimeReport", CrimeReportSchema);
