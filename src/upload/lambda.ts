import { S3 } from "aws-sdk";

const s3 = new S3();

export const handler = async (event: any) => {
	const bucketName = `${process.env.S3_BUCKET_NAME}`;
	const { fileName, fileContent } = JSON.parse(event.body);

	const params = {
		Bucket: bucketName,
		Key: fileName,
		Body: Buffer.from(fileContent, "base64"), // Assuming fileContent is base64 encoded
		ContentType: "image/jpeg", // Adjust based on your image type
	};

	try {
		await s3.upload(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Image uploaded successfully",
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Error uploading image",
			}),
		};
	}
};
