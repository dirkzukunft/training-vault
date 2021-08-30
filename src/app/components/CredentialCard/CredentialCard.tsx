import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';

type credentialCardProps = {
  credential: Credential;
  startMode?: string;
  onSaveClick: (credential: Credential) => Promise<boolean>;
};

export default function CredentialCard({
  credential,
  startMode = 'view',
  onSaveClick,
}: credentialCardProps): JSX.Element {
  const [mode, setMode] = useState<string>(startMode);
  const [service, setService] = useState<string>(credential.service);
  const [username, setUsername] = useState<string>(credential.username);
  const [password, setPassword] = useState<string>(credential.password);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (await onSaveClick({ service, username, password })) {
      if (mode === 'edit') setMode('view');
    } else {
      alert('ERROR');
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <article className={styles.credentiaCard}>
        <div className={styles.service}>
          {mode !== 'add' && service}
          {mode === 'add' && (
            <input
              className={styles.inputService}
              placeholder="Service name"
              value={service}
              onChange={(event) => setService(event.target.value)}
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
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={styles.inputUsername}
            />
          )}
        </div>
        <div className={styles.password}>
          {mode !== 'edit' && mode !== 'add' && password}
          {(mode === 'edit' || mode === 'add') && (
            <input
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={styles.inputPassword}
            />
          )}
          {(mode === 'edit' || mode === 'add') && (
            <input type="submit" value="Save" className={styles.inputSubmit} />
          )}
        </div>
      </article>
      {mode === 'error' && `Update ERROR!`}
    </form>
  );
}
