import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
