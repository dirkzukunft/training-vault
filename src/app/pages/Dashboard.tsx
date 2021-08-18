import React from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <div className={styles.dashboard}>
      <h1>Vault</h1>

      <label>
        <span className={styles.label}>Master password</span>
        <input
          type="password"
          id="password"
          className={styles.input}
          placeholder=""
        />
      </label>

      <label>
        <span className={styles.label}>Search for</span>
        <input type="search" id="search" className={styles.input} />
      </label>

      <div className={styles.result}>No Result</div>
    </div>
  );
}
