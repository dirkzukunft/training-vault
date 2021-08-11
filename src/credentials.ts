import { readFile } from 'fs/promises';
import { DB, Credential } from './types';

export async function readCredentials(): Promise<Credential[]> {
  const dbData = await readFile('./src/db.json', 'utf-8');
  const db: DB = JSON.parse(dbData);
  return db.credentials;
}

export async function getCredential(service: string): Promise<Credential> {
  const credentials = await readCredentials();
  if (!credentials) throw new Error(`No credentials found`);

  const credential = credentials.find(
    (credential) => credential.service === service
  );

  if (!credential)
    throw new Error(`No credential found for service ${service}`);

  return credential;
}
