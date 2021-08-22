import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';

type credentialCardProps = {
  credential: Credential;
  editMode?: boolean;
  addMode?: boolean;
};

export default function CredentialCard({
  credential,
  editMode = false,
  addMode = false,
}: credentialCardProps): JSX.Element {
  const { service, username, password } = credential;
  const [isEditMode, setIsEditMode] = useState<boolean>(editMode);
  const [isAddMode, setIsAddMode] = useState<boolean>(addMode);
  const [changedService, setChangedService] = useState<string>(service);
  const [changedUsername, setChangedUsername] = useState<string>(username);
  const [changedPassword, setChangedPassword] = useState<string>(password);

  function changeToEditMode() {
    editMode = true;
  }

  return (
    <article className={styles.credentiaCard}>
      <div className={styles.service}>
        {!isAddMode && service}
        {isAddMode && (
          <input
            className={styles.inputService}
            placeholder="Service name"
            value={changedService}
            onChange={(event) => setChangedService(event.target.value)}
          />
        )}
        <div className={styles.links}>
          {!isEditMode && !isAddMode && (
            <Icon
              icon="mdi-light:pencil"
              width="1.5rem"
              height="1.5rem"
              inline={true}
              onClick={() => setIsEditMode(true)}
            />
          )}
          {!isAddMode && (
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
        {!isEditMode && !isAddMode && username}
        {(isEditMode || isAddMode) && (
          <input
            placeholder="Username"
            value={changedUsername}
            onChange={(event) => setChangedUsername(event.target.value)}
          />
        )}
      </div>
      <div className={styles.password}>
        {!isEditMode && !isAddMode && password}
        {(isEditMode || isAddMode) && (
          <input
            placeholder="Password"
            value={changedPassword}
            onChange={(event) => setChangedPassword(event.target.value)}
          />
        )}
      </div>
    </article>
  );
}
