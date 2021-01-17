import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

import loginPage from './components/loginPage';
import logout from './components/logoutButton';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('hello world');
  }

  render() {
    return (
      <div className="App-intro">
        <Router>
          <Switch>
            <Route exact path="/login" component={loginPage} />
            <Route exact path="/logout" component={logout} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
