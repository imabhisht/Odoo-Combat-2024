import sdk from "node-appwrite";

class AppwriteClient {
  private client: sdk.Client;
  public account: sdk.Account;
  public endpoint = process.env.APPWRITE_ENDPOINT!
  public project = process.env.APPWRITE_PROJECT!
  public apiKey = process.env.APPWRITE_API_KEY!


  constructor() {
    this.client = new sdk.Client();
    

    this.client
      .setSelfSigned(true)
      .setProject(this.project)
      .setKey(this.apiKey)
      .setEndpoint(this.endpoint);

    this.account = new sdk.Account(this.client);
  }
}

export default AppwriteClient;
