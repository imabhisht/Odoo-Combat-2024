import { Request, Response } from "express";
import Location from "../models/location.model";

export const createLocation = async (req: Request, res: Response) => {
	try {
		const { userId, latitude, longitude } = req.body;

		const location = new Location({
			userId,
			latitude,
			longitude,
		});

		await location.save();

		res.status(201).json({
			message: "Location saved successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Location save fail: Internal server error",
		});
	}
};
