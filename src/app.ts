import express, { Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import * as dotenv from "dotenv";
import connectDB from "./db/conn";

dotenv.config();

const app = express();

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

const port = process.env.PORT || 5000;

connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(
				`Server is running at http://localhost:${port}`
			);
		});
	})
	.catch((err) => {
		console.log("MongoDB failed to connect ...", err);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});
