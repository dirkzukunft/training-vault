import { readFile, writeFile } from 'fs/promises';
import { encryptCredential, decryptCredential } from './utils/crypto';
import { DB, Credential } from './types';

async function readCredentials(): Promise<Credential[]> {
  try {
    const dbData = await readFile('./src/db.json', 'utf-8');
    const db: DB = JSON.parse(dbData);
    return db.credentials;
  } catch (error) {
    throw new Error('Could not load credentials from database');
  }
}

export async function getAllCredentials(key: string): Promise<Credential[]> {
  const credentials = await readCredentials();
  const decryptedCredentials = credentials.map((credential) =>
    decryptCredential(credential, key)
  );
  return decryptedCredentials;
}

export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const credentials = await readCredentials();

  const credential = credentials.find(
    (credential) => credential.service === service
  );

  if (!credential)
    throw new Error(`No credential found for service ${service}`);

  return decryptCredential(credential, key);
}

export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  const credentials = await readCredentials();
  const newCredentials = [...credentials, encryptCredential(credential, key)];
  await setCredentials(newCredentials);
}

export async function deleteCredential(service: string): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  await setCredentials(filteredCredentials);
}

export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  const newCredentials = [
    ...filteredCredentials,
    encryptCredential(credential, key),
  ];
  await setCredentials(newCredentials);
}

async function setCredentials(credentials: Credential[]) {
  const newDB: DB = { credentials: credentials };
  await writeFile('./src/db.json', JSON.stringify(newDB, null, 2));
}
