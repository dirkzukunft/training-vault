import React from 'react';
import CredentialCard from '../../components/CredentialCard/CredentialCard';

export default function AddCredential(): JSX.Element {
  return (
    <CredentialCard
      addMode
      credential={{ service: 'dd', username: '', password: '' }}
    />
  );
}
