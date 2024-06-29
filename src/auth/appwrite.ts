import sdk from "node-appwrite";

class AppwriteClient {
	private client: sdk.Client;
	public account: sdk.Account;
	public endpoint = process.env.APPWRITE_ENDPOINT!;
	public project = process.env.APPWRITE_PROJECT!;
	public apiKey = process.env.APPWRITE_API_KEY!;

	constructor(jwtToken?: string) {
		this.client = new sdk.Client();

		this.client
			.setSelfSigned(true)
			.setProject(process.env.APPWRITE_PROJECT_ID!)
			.setEndpoint("https://cloud.appwrite.io/v1");

		if (jwtToken) {
			this.client.setJWT(jwtToken);
		} else {
			this.client.setKey(this.apiKey);
		}

		this.account = new sdk.Account(this.client);
	}
}

export default AppwriteClient;
