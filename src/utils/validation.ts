import { readFile } from 'fs/promises';
import CryptoJS from 'crypto-js';

export async function validateMasterPassword(
  password: string
): Promise<boolean> {
  const hashedMasterPasword = await readFile('.password', 'utf-8');
  return CryptoJS.SHA256(password).toString() === hashedMasterPasword;
}
