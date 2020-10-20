import React, { useState } from 'react';
import AppRouter from './Router';
import {authService} from "../database/fBase"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; Hwitter{new Date().getFullYear}</footer>
    </>
  );
}

export default App;
