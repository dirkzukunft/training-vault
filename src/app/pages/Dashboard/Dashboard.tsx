import React, { useEffect, useState } from 'react';
import { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import { useMasterPassword } from '../../components/MasterPasswordContext/MasterPasswordContext';
import styles from './Dashboard.module.css';
import { updateCredential as updateCredential } from '../../utils/credentials';

export default function Dashboard(): JSX.Element {
  const { masterPassword, setMasterPassword } = useMasterPassword();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function handleSaveClick(credential: Credential): Promise<boolean> {
    return await updateCredential(credential, masterPassword, true);
  }

  useEffect(() => {
    if (masterPassword) {
      (async () => {
        const response = await fetch('/api/credentials', {
          headers: { Authorization: masterPassword },
        });
        const fetchedCredentials = response.ok ? await response.json() : '';
        setCredentials(fetchedCredentials);
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [masterPassword]);

  return (
    <div className={styles.dashboard}>
      {!loading && credentials.length === 0 && (
        <label>
          <div className={styles.label}>Master password:</div>
          <input
            type="password"
            className={styles.input}
            onChange={(event) => setMasterPassword(event.target.value)}
          />
        </label>
      )}

      <div className={styles.result}>
        {!loading &&
          credentials.length > 0 &&
          credentials.map((credential) => (
            <CredentialCard
              credential={credential}
              startMode="view"
              onSaveClick={handleSaveClick}
              key={credential.service}
            />
          ))}
      </div>
    </div>
  );
}
