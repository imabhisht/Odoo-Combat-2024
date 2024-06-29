import { Client, Account } from "appwrite";
export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(
	`6680015b0014c878b3bd`
);

export const account = new Account(client);
export { ID } from "appwrite";
