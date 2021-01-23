import React from 'react';

import LogoutButton from './logoutButton';
import LoginPanel from './loginPanel';
import RegisterPanel from './registerPanel';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function LoginPage() {
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

export default LoginPage;
