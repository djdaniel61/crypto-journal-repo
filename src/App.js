import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import APIImport from './components/pages/APIImport';
import Tags from './components/pages/Tags';
import Trades from './components/pages/Trades';

import { withAuthenticator } from '@aws-amplify/ui-react';

function App() {
  return (
    <>
      <Router>
        {/* <AmplifySignOut /> */}
        <Navbar />
        <div className='page-content'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/trades' component={Trades} />
            <Route path='/tags' component={Tags} />
            <Route path='/importer' component={APIImport} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
