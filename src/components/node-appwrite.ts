import { Account, Client, Databases } from "node-appwrite";

async function CreateAdminClient() {
  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string)
  return client;
}

async function CreateAdminAccount() {
  const client = await CreateAdminClient();
  const account = new Account(client);
  return account;
}

export async function RetrieveFile(databaseID: string, collectionID: string, documentID: string) {
  const client = await CreateAdminClient();
  const database = new Databases(client);
  const response = await database.getDocument(databaseID, collectionID, documentID);
  return response;
}

export async function GetActiveServers() {
  const client = await CreateAdminClient();
  const database = new Databases(client);
  const response = await database.listDocuments("677fa96000311c0521fc", "677fa969000d44d60c57");
  return response;
}