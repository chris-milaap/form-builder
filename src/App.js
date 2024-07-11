import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import Login from './components/Login';
import FormBuilder from './components/FormBuilder';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [author, setAuthor] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setAuthor(username);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? (
        <FormBuilder author={author} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </ThemeProvider>
  );
}

export default App;