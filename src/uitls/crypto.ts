import CryptoJS from 'crypto-js';
import { Credential } from '../types';

export function encryptCredential(
  credential: Credential,
  key: string
): Credential {
  const encryptedPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    key
  ).toString();
  return { ...credential, password: encryptedPassword };
}

export function decryptCredential(
  credential: Credential,
  key: string
): Credential {
  const decryptedPassword = CryptoJS.TripleDES.decrypt(
    credential.password,
    key
  ).toString(CryptoJS.enc.Utf8);
  return { ...credential, password: decryptedPassword };
}
