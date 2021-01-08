import React from 'react';

import LogoutButton from './components/logoutButton';
import LoginPanel from './components/loginPanel';
import RegisterPanel from './components/registerPanel';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">Welcome to UWTutor</header>
      <LogoutButton />
      <div className="rowC">
        <LoginPanel />
        <RegisterPanel />
      </div>
    </div>
  );
}

export default App;
