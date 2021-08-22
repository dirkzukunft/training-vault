import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Headline from './components/Headline/Headline';
import { MasterPasswordContext } from './components/MasterPasswordContext/MasterPasswordContext';
import AddCredential from './pages/AddCredential/AddCredential';
import Dashboard from './pages/Dashboard/Dashboard';
import DeleteCredential from './pages/DeleteCredential/DeleteCredential';
import SearchCredential from './pages/SearchCredential/SearchCredential';

function App(): JSX.Element {
  const [masterPassword, setMasterPassword] = useState<string>('');

  return (
    <MasterPasswordContext.Provider
      value={{ masterPassword, setMasterPassword }}
    >
      <BrowserRouter>
        <Headline>Vault</Headline>
        <Switch>
          <Route path="/delete/:service">
            <DeleteCredential />
          </Route>
          <Route path="/add">
            <AddCredential />
          </Route>
          <Route path="/search">
            <SearchCredential />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </MasterPasswordContext.Provider>
  );
}

export default App;
