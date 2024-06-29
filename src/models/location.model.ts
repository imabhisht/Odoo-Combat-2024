import mongoose, { Schema, Document } from "mongoose";

interface ILocation extends Document {
	userId: mongoose.Types.ObjectId;
	latitude: number;
	longitude: number;
}

const LocationSchema: Schema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
});

export default mongoose.model<ILocation>("Location", LocationSchema);
