import React, { useEffect, useState } from 'react';
import { Credential } from '../../../types';
import styles from './Dashboard.module.css';
import { useMasterPassword } from '../../components/MasterPasswordContext';

export default function Dashboard(): JSX.Element {
  const { masterPassword, setMasterPassword } = useMasterPassword();
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/credentials', {
        headers: { Authorization: masterPassword },
      });
      const fetchedCredentials =
        response.status === 200 ? await response.json() : '';
      setCredentials(fetchedCredentials);
    })();
  }, [masterPassword]);

  return (
    <div className={styles.dashboard}>
      <h1>Vault</h1>

      {credentials.length === 0 && (
        <label>
          <span className={styles.label}>Master password</span>
          <input
            type="password"
            className={styles.input}
            onChange={(event) => setMasterPassword(event.target.value)}
          />
        </label>
      )}

      <div className={styles.result}>
        {credentials.length > 0 &&
          credentials.map((credential) => (
            <div key={`div-${credential.service}`}>
              <p key={`service-${credential.service}`}>{credential.service}</p>
              <p key={`username-${credential.service}`}>
                {credential.username}
              </p>
              <p key={`password-${credential.service}`}>
                {credential.password}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
