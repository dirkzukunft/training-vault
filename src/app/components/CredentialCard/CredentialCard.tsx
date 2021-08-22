import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Credential } from '../../../types';
import { useMasterPassword } from '../MasterPasswordContext/MasterPasswordContext';
import styles from './CredentialCard.module.css';

type credentialCardProps = {
  credential: Credential;
  type?: string;
};

export default function CredentialCard({
  credential,
  type = 'view',
}: credentialCardProps): JSX.Element {
  const { masterPassword } = useMasterPassword();
  const [mode, setMode] = useState<string>(type);
  const [currentCredential, setcurrentCredential] =
    useState<Credential>(credential);
  const { service, username, password } = currentCredential;
  const [changedService, setChangedService] = useState<string>(service);
  const [changedUsername, setChangedUsername] = useState<string>(username);
  const [changedPassword, setChangedPassword] = useState<string>(password);

  async function saveCredential(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const newCredential: Credential = {
      service: changedService,
      username: changedUsername,
      password: changedPassword,
    };
    const apiURL =
      mode === 'edit' ? `/api/credentials/${service}` : `/api/credentials/`;
    const apiMethod = mode === 'edit' ? `PUT` : `POST`;
    const response = await fetch(apiURL, {
      method: apiMethod,
      headers: {
        Authorization: masterPassword,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCredential),
    });

    if (response.status === 200) {
      setcurrentCredential(newCredential);
      if (mode === 'edit') setMode('view');
      if (mode === 'add') setMode('added');
    } else {
      setMode('error');
    }
  }

  return (
    <form>
      <article className={styles.credentiaCard}>
        <div className={styles.service}>
          {mode !== 'add' && service}
          {mode === 'add' && (
            <input
              className={styles.inputService}
              placeholder="Service name"
              value={changedService}
              onChange={(event) => setChangedService(event.target.value)}
            />
          )}
          <div className={styles.links}>
            {mode !== 'add' && mode !== 'edit' && (
              <Icon
                icon="mdi-light:pencil"
                width="1.5rem"
                height="1.5rem"
                inline={true}
                onClick={() => setMode('edit')}
              />
            )}
            {mode !== 'add' && (
              <Link to={`/delete/${service}`}>
                <Icon
                  icon="mdi-light:delete"
                  width="1.5rem"
                  height="1.5rem"
                  inline={true}
                />
              </Link>
            )}
          </div>
        </div>

        <div className={styles.username}>
          {mode !== 'edit' && mode !== 'add' && username}
          {(mode === 'edit' || mode === 'add') && (
            <input
              placeholder="Username"
              value={changedUsername}
              onChange={(event) => setChangedUsername(event.target.value)}
              className={styles.inputUsername}
            />
          )}
        </div>
        <div className={styles.password}>
          {mode !== 'edit' && mode !== 'add' && password}
          {(mode === 'edit' || mode === 'add') && (
            <input
              placeholder="Password"
              value={changedPassword}
              onChange={(event) => setChangedPassword(event.target.value)}
              className={styles.inputPassword}
            />
          )}
          {(mode === 'edit' || mode === 'add') && (
            <input
              type="submit"
              value="Save"
              onClick={saveCredential}
              className={styles.inputSubmit}
            />
          )}
        </div>
      </article>
      {mode === 'added' && <Redirect to="/" />}
      {mode === 'error' && `Update ERROR!`}
    </form>
  );
}
