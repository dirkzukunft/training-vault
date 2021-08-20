import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Password from './pages/Password/Password';
import { MasterPasswordContext } from './components/MasterPasswordContext';

function App(): JSX.Element {
  const [masterPassword, setMasterPassword] = useState<string>('no pw');

  return (
    <MasterPasswordContext.Provider
      value={{ masterPassword, setMasterPassword }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/password/:service">
            <Password />
          </Route>
        </Switch>
      </BrowserRouter>
    </MasterPasswordContext.Provider>
  );
}

export default App;
