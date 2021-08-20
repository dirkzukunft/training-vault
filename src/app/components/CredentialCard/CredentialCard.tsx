import React from 'react';
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
      <p className={styles.service}>{service}</p>
      <p className={styles.username}>{username}</p>
      <p className={styles.password}>{password}</p>
    </article>
  );
}
