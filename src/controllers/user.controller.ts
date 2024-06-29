import { Request, Response } from "express";
import AppwriteClient from "../auth/appwrite";
import { AuthenticatedRequest } from "../interface";
import prisma from "../db/prisma";
// Role Enum
enum Role {
	ADMIN = "admin",
	USER = "user",
	POLICe = "police",
}

export const getUserInfo = async (req: any, res: Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.custom_session["$id"],
			},
		});
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}
		return res.status(200).json({
			message: "User info fetched successfully",
			data: user,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal server error" });
	}
};

export const createUser = async (req: any, res: Response) => {
	const { role } = req.body;
	console.log(req.custom_session);
	if (!role) {
		return res.status(400).json({ message: "Role is required" });
	}
	try {
		const user = await prisma.user.create({
			data: {
				role,
				email_id: req.custom_session.email,
				name: req.custom_session?.name,
				id: req.custom_session["$id"],
			},
		});

		return res.status(201).json({
			message: "User created successfully",
			data: user,
		});
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};
