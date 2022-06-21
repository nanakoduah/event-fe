import { Box } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/dashboard';

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/events/new" element={<div>new event here</div>} />
          <Route path="/events/:id/edit" element={<div>edit event here</div>} />
          <Route path="/events/:id/view" element={<div>View event here</div>} />
          <Route path="/me" element={<div>Me components here</div>} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
