import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMasterPassword } from '../../components/MasterPasswordContext/MasterPasswordContext';

export default function DeleteCredential(): JSX.Element {
  const { service } = useParams<{ service: string }>();
  const { masterPassword } = useMasterPassword();
  const [status, setStatus] = useState<string>(`processing...`);

  async function deleteCredential() {
    const response = await fetch(`/api/credentials/${service}`, {
      method: `DELETE`,
      headers: {
        Authorization: masterPassword,
      },
    });

    if (response.ok) {
      setStatus(`${service} deleted.`);
    } else {
      setStatus(`ERROR - ${service} could not be deleted.`);
    }
  }

  deleteCredential();
  return <>{status}</>;
}
