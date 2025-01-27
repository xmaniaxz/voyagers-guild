import { Cousine } from "next/font/google";
import { Account, Client, Databases, ID } from "node-appwrite";

async function CreateAdminClient() {
  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string);
    return client;
}


async function CreateAdminAccount() {
    const client = await CreateAdminClient();
    const account = new Account(client);
    return account;
}

export async function RetrieveFile(databaseID:string,collectionID:string,documentID:string) {
    const client = await CreateAdminClient();
    const database = new Databases(client);
    const response = database.getDocument(databaseID,collectionID,documentID);
    if(response) {
        //console.log(response);
        return response;
    }
}
