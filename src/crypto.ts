import CryptoJS from 'crypto-js';
import { Credential } from './types';

const masterKey = 'meinMasterKey';

export function encryptCredential(credential: Credential): Credential {
  const encryptedPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    masterKey
  ).toString();
  return { ...credential, password: encryptedPassword };
}

export function decryptCredential(credential: Credential): Credential {
  const decryptedPassword = CryptoJS.TripleDES.decrypt(
    credential.password,
    masterKey
  ).toString(CryptoJS.enc.Utf8);
  return { ...credential, password: decryptedPassword };
}
