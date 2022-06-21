import { Box } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './state';
import Dashboard from './components/dashboard';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import CreateEvent from './components/events/create';
import AuthGuard from './components/auth/AuthGuard';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <AuthGuard>
            <Routes>
              <Route path="/events/new" element={<CreateEvent />} />
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
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </AuthGuard>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
