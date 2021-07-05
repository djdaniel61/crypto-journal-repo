import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbarfinal from './components/Navbarfinal';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Importer from './components/pages/Importer';
import Tags from './components/pages/Tags';
import Trades from './components/pages/Trades';

function App() {
  return (
    <>
      <Router>
        <Navbarfinal />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/trades' component={Trades} />
          <Route path='/tags' component={Tags} />
          <Route path='/importer' component={Importer} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
