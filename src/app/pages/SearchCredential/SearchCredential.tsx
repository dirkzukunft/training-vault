import React, { useEffect, useState } from 'react';
import { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import { useMasterPassword } from '../../components/MasterPasswordContext/MasterPasswordContext';
import styles from './SearchCredential.module.css';

export default function SearchCredential(): JSX.Element {
  const { masterPassword } = useMasterPassword();
  const [credential, setCredential] = useState<Credential | undefined>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (search) {
      (async () => {
        const response = await fetch(`/api/credentials/${search}`, {
          headers: { Authorization: masterPassword },
        });
        const fetchedCredential = response.ok
          ? await response.json()
          : undefined;
        setCredential(fetchedCredential);
      })();
    }
  }, [search]);

  return (
    <div className={styles.dashboard}>
      {!credential && (
        <label>
          <div className={styles.label}>Service:</div>
          <input
            className={styles.input}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      )}

      <div className={styles.result}>
        {credential && <CredentialCard credential={credential} />}
      </div>
    </div>
  );
}
