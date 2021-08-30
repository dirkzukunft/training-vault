import React from 'react';
import { useHistory } from 'react-router-dom';
import { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import { useMasterPassword } from '../../components/MasterPasswordContext/MasterPasswordContext';
import { updateCredential } from '../../utils/credentials';

export default function AddCredential(): JSX.Element {
  const { masterPassword } = useMasterPassword();
  const history = useHistory();

  async function addCredential(credential: Credential): Promise<boolean> {
    const result = await updateCredential(credential, masterPassword, false);
    if (result) history.push('/');
    return result;
  }
  return (
    <CredentialCard
      startMode="add"
      credential={{ service: '', username: '', password: '' }}
      onSaveClick={addCredential}
    />
  );
}
