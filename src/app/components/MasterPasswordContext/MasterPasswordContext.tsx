import { createContext, useContext } from 'react';

export type GlobalMasterPassword = {
  masterPassword: string;
  setMasterPassword: (c: string) => void;
};

export const MasterPasswordContext = createContext<GlobalMasterPassword>({
  masterPassword: '',
  setMasterPassword: () => {
    ('');
  },
});
export const useMasterPassword = (): GlobalMasterPassword =>
  useContext(MasterPasswordContext);
