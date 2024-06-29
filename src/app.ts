import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/user.route";
import * as dotenv from "dotenv";
import connectDB from "./db/conn";
import locationRouter from "./routes/location.route";
import { generateUploadURL } from "./upload/s3";

dotenv.config();

const app = express();

app.use(express.static("front"));
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(
				`Server is running at http://localhost:${process.env.PORT}`
			);
		});
	})
	.catch((err) => {
		console.log("MongoDB failed to connect ...", err);
	});

app.use("/users", userRouter);
app.use("/location", locationRouter);

app.get("/s3Url", async (req, res) => {
	const url = await generateUploadURL();
	res.send({ url });
});

app.get("/", (req: Request, res: Response) => {
	res.send("Hello there, we are Team BigO( WON ) !");
});
