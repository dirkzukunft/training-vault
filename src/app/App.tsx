import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
