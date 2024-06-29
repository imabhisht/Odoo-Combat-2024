import { Request, Response } from "express";
export const getUserInfo = async (req: Request, res: Response) => {
	const userId = req.params.id;
	try {
		return res
			.status(200)
			.json({ message: "User info fetched successfully" });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal server error" });
	}
};
