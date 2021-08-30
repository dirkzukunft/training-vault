import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMasterPassword } from '../../components/MasterPasswordContext/MasterPasswordContext';
import { deleteCredential } from '../../utils/credentials';

export default function DeleteCredential(): JSX.Element {
  const { service } = useParams<{ service: string }>();
  const { masterPassword } = useMasterPassword();
  const [status, setStatus] = useState<string>(`processing...`);

  async function handleDeleteCredential() {
    if (await deleteCredential(service, masterPassword)) {
      setStatus(`${service} deleted.`);
    } else {
      setStatus(`ERROR - ${service} could not be deleted.`);
    }
  }

  handleDeleteCredential();
  return <>{status}</>;
}
