import { Collection, MongoClient } from 'mongodb';
import { encryptCredential, decryptCredential } from './../utils/crypto';
import { Credential } from './../types';
import dotenv from 'dotenv';
dotenv.config();

let client: MongoClient;
let collection: Collection;
const dbName = 'vault';
const collectionName = 'credentials';

export async function connectDb(): Promise<void> {
  if (!process.env.DB_URI) throw new Error('No DB_URI in the .env found');
  client = new MongoClient(process.env.DB_URI);
  try {
    await client.connect();
    collection = client.db(dbName).collection(collectionName);
  } catch (error) {
    throw new Error(`Database connection failed: ${error}`);
  }
}

export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  const encryptedCredential = encryptCredential(credential, key);
  await collection.insertOne(encryptedCredential);
}

export async function getAllCredentials(key: string): Promise<Credential[]> {
  const credentials: Credential[] = await collection
    .find()
    .project({ _id: 0 })
    .toArray();
  const decryptedCredentials = credentials.map((credential) =>
    decryptCredential(credential, key)
  );
  return decryptedCredentials;
}

export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const result = await collection.findOne({
    service: service,
  });
  if (!result) throw new Error(`No credential found for service ${service}`);

  delete result._id;
  const credential = { service: '', username: '', password: '', ...result };

  return decryptCredential(credential, key);
}
