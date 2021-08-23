import { Credential } from '../../types';

export async function changeCredential(
  credential: Credential,
  masterPassword: string,
  updateMode: boolean
): Promise<boolean> {
  const apiURL = updateMode
    ? `/api/credentials/${credential.service}`
    : `/api/credentials/`;
  const apiMethod = updateMode ? `PUT` : `POST`;
  const response = await fetch(apiURL, {
    method: apiMethod,
    headers: {
      Authorization: masterPassword,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credential),
  });
  return response.ok;
}
