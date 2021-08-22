import React from 'react';
import CredentialCard from '../../components/CredentialCard/CredentialCard';

export default function AddCredential(): JSX.Element {
  return (
    <CredentialCard
      type="add"
      credential={{ service: '', username: '', password: '' }}
    />
  );
}
