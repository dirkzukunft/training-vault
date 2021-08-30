import { Credential } from '../../types';

export async function addOrUpdateCredential(
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

export async function deleteCredential(
  service: string,
  masterPassword: string
): Promise<boolean> {
  const response = await fetch(`/api/credentials/${service}`, {
    method: `DELETE`,
    headers: {
      Authorization: masterPassword,
    },
  });
  return response.ok;
}
