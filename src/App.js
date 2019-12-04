import React from 'react';
import './App.css';

import Login from './components/login';
import LoginWrapper from './components/context';

function App() {
  return (
    <>
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    </>
  );
}

export default App;
