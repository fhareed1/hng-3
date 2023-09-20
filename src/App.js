import React from 'react';
import Router from './Router/Router';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='z-50'>
      <ToastContainer />
      <Router />
    </div>
  );
}

export default App;
