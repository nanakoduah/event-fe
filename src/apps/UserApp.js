import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateEvent from '../components/events/create';
import routes from '../routes';

function UserApp() {
  return (
    <Routes>
      <Route path={routes.createEvent} element={<CreateEvent />} />
      <Route
        path={routes.updateEvent}
        element={
          <div>Edit should come here. But... this won't be implemented</div>
        }
      />
      <Route path={routes.viewEvent} element={<div>View event here</div>} />
      <Route path="/me" element={<div>Me components here</div>} />
      <Route path="*" element={<div>No route was hit user</div>} />
    </Routes>
  );
}

export default UserApp;
