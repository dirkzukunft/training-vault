import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';

type credentialProps = {
  credential: Credential;
};

export default function CredentialCard({
  credential,
}: credentialProps): JSX.Element {
  const { service, username, password } = credential;
  return (
    <article className={styles.credentiaCard}>
      <div className={styles.service}>
        {service}
        <div className={styles.links}>
          <Icon
            icon="mdi-light:pencil"
            width="1.5rem"
            height="1.5rem"
            inline={true}
          />
          <Link to={`/search/${service}`}>
            <Icon
              icon="mdi-light:delete"
              width="1.5rem"
              height="1.5rem"
              inline={true}
            />
          </Link>
        </div>
      </div>

      <div className={styles.username}>{username}</div>
      <div className={styles.password}>{password}</div>
    </article>
  );
}
