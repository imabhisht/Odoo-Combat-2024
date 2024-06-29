import dotenv from "dotenv";
import aws, { S3 } from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.S3_BUCKET_NAME!;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: "v4",
});

export async function generateUploadURL(): Promise<string> {
	const rawBytes = await randomBytes(16);
	const imageName = rawBytes.toString("hex");

	const expirationTime = new Date();
	expirationTime.setMinutes(expirationTime.getMinutes() + 60);

	const params: S3.PutObjectRequest = {
		Bucket: bucketName,
		Key: imageName,
		Expires: expirationTime,
	};

	const uploadURL: string = await s3.getSignedUrlPromise(
		"putObject",
		params
	);
	return uploadURL;
}
