
import sdk from "node-appwrite";
const config = {
  endpoint: process.env.APPWRITE_ENDPOINT!,
  project: process.env.APPWRITE_PROJECT!,
  key: process.env.APPWRITE_API_KEY!,
};

const client = new sdk.Client();

client
    .setSelfSigned(true)
    .setProject(config.project)
    .setKey(config.key)
    .setEndpoint(config.endpoint);


const account = new sdk.Account(client);
export {
  account
}