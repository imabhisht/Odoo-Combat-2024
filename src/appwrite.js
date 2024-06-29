import { Client, Account } from "appwrite";
const client = new Client();
client
.setEndpoint("https://cloud.appwrite.io/v1") // Set your own appwrite server endpoint here, if not sure, you can get this value from your project settings page.
.setProject("667f7dd700207eb41830")

export const account = new Account(client);
