import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import Button from '@material-ui/core/Button/index';

import home from './components/homePage';
import loginPanel from './components/loginPanel';
import registerPanel from './components/registerPanel';
import logout from './components/logoutButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asdf: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { asdf } = this.state;
    this.setState({ asdf: !asdf });
    console.log('The button was clicked.');
  }
  /* eslint-disable jsx-a11y/control-has-associated-label */

  render() {
    console.log('asdf');
    const Custombutton = () => (
      <div className="state-button">
        <Button variant="contained" onClick={this.handleClick}>
          Change State
        </Button>
      </div>
    );
    const { asdf } = this.state;
    return (
      <div className="App-intro">
        <Router>
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/login" component={loginPanel} />
            <Route path="/register" component={registerPanel} />
            <Route path="/logout" component={logout} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
