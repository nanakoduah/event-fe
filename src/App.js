import { AppBar, Box } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import Dashboard from './components/dashboard';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Router>
          <Routes>
            <Route path="/events/new" element={<div>new event here</div>} />
            <Route
              path="/events/:id/edit"
              element={<div>edit event here</div>}
            />
            <Route
              path="/events/:id/view"
              element={<div>View event here</div>}
            />
            <Route path="/me" element={<div>Me components here</div>} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
