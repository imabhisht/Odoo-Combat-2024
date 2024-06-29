import mongoose, { Schema, Document } from "mongoose";

interface ILocation extends Document {
	report_id: mongoose.Types.ObjectId;
	latitude: number;
	longitude: number;
	crime_type: string;
	timestamp: Date;
}

const LocationSchema: Schema = new Schema({
	report_id: { type: Schema.Types.ObjectId, ref: "CrimeReport" },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
	crime_type: { type: String, required: true },
	timestamp: { type: Date, required: true },
});

export default mongoose.model<ILocation>("Location", LocationSchema);
