"use server"
import { Account, Client, Databases,Query } from "node-appwrite";

const CreateAdminClient = async (): Promise<Client> => {
  const client = new Client();
  const endpoint: string = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
  const projectId: string = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
  const secretKey: string = process.env.NEXT_PUBLIC_APPWRITE_API_KEY!;
  // console.log(endpoint)
  client.setEndpoint(endpoint).setProject(projectId).setKey(secretKey);
  return client;
};

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

export async function LoadFromCollection(
  databaseID: string,
  collectionID: string
) {
  const database = new Databases(await CreateAdminClient());
  try {
    const response = await database.listDocuments(databaseID, collectionID, [
      Query.limit(200),
    ]);
    return {
      code: 200,
      message: response.documents,
    };
  } catch (error) {
    return { code: 404, message: error };
  }
}