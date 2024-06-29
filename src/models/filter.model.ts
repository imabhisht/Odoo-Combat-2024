import mongoose, { Schema, Document } from "mongoose";

interface IFilter extends Document {
	user_id: mongoose.Types.ObjectId;
	search_query: string;
	filter_type: string;
	created_at: Date;
}

const FilterSchema: Schema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: "User" },
	search_query: { type: String, required: true },
	filter_type: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IFilter>("Filter", FilterSchema);
