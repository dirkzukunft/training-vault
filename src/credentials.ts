import { readFile, writeFile } from 'fs/promises';
import { DB, Credential } from './types';

export async function readCredentials(): Promise<Credential[]> {
  try {
    const dbData = await readFile('./src/db.json', 'utf-8');
    const db: DB = JSON.parse(dbData);
    return db.credentials;
  } catch (error) {
    throw new Error('Could not load credentials from database');
  }
}

export async function getCredential(service: string): Promise<Credential> {
  const credentials = await readCredentials();

  const credential = credentials.find(
    (credential) => credential.service === service
  );

  if (!credential)
    throw new Error(`No credential found for service ${service}`);

  return credential;
}

export async function addCredential(credential: Credential): Promise<void> {
  const credentials = await readCredentials();
  const newCredentials = [...credentials, credential];
  await setCredentials(newCredentials);
}

export async function deleteCredential(service: string): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  await setCredentials(filteredCredentials);
}

async function setCredentials(credentials: Credential[]) {
  const newDB: DB = { credentials: credentials };
  setDB(newDB);
}

async function setDB(newDB: DB): Promise<void> {
  await writeFile('./src/db.json', JSON.stringify(newDB, null, 2));
}
