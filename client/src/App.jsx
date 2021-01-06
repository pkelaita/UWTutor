import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from './actions/userActions';

import './App.css';

const id = 'kelaita';
const password = 'asdf123';

function App({ actions }) {
  return (
    <div className="App">
      <header className="App-header">Welcome to UWTutor</header>
      <button
        type="button"
        onClick={async () => {
          await actions.login(id, password);
        }}
      >
        Login
      </button>
      <button
        type="button"
        onClick={async () => {
          await actions.logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(App);
