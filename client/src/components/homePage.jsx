import React from 'react';

import LogoutButton from './logoutButton';
import LoginPanel from './loginPanel';
import RegisterPanel from './registerPanel';
import TutorButton from './getTutorButton';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">Welcome to UWTutor</header>
      <div className="body">Hello World!</div>
      <div className="logout-button">
        <TutorButton />
      </div>
    </div>
  );
}

export default HomePage;
