import { TripleDES } from 'crypto-js';
import { Credential } from './types';

const masterKey = 'meinMasterKey';

export function cryptCredential(credential: Credential): Credential {
  const cryptedPassword = TripleDES.encrypt(
    credential.password,
    masterKey
  ).toString();
  return { ...credential, password: cryptedPassword };
}
