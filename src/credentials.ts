import { readFile } from 'fs/promises';
import { DB, Credential } from './types';

export async function readCredentials(): Promise<Credential[]> {
  const dbData = await readFile('./src/db.json', 'utf-8');
  const db: DB = JSON.parse(dbData);
  return db.credentials;
}
