import { Request, Response, NextFunction } from "express";
import AppwriteClient from "../auth/appwrite";

export const authenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers["authorization"];

		if (!token) {
			return res.status(401).json({
				message: "Unauthorized: No token provided",
			});
		}

		const appwriteClient = new AppwriteClient(token);
		const userInfo = await appwriteClient.account.get();
		console.log(userInfo);
		next();
	} catch (error: any) {
		console.log(error);
		return res.status(401).json({ message: error.message });
	}
};
