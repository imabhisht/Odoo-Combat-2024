import mongoose, { Schema, Document } from "mongoose";

interface ILocation extends Document {
	userId: mongoose.Types.ObjectId;
	lat: number;
	long: number;
	timestamp: Date;
}

const LocationSchema: Schema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	lat: { type: Number, required: true },
	long: { type: Number, required: true },
	timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ILocation>("Location", LocationSchema);
