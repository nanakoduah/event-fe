import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateEvent from '../components/events/create';
import CreateCategory from '../components/categories/create';
import routes from '../routes';

function AdminApp() {
  return (
    <Routes>
      <Route path={routes.categories} element={<div>Category list</div>} />
      <Route path={routes.createCategory} element={<CreateCategory />} />
      <Route path={routes.updateCategory} element={<div>Edit category</div>} />

      <Route path={routes.users} element={<div>User list</div>} />
      <Route path={routes.createUser} element={<div>Create user</div>} />
      <Route
        path={routes.updateCategory}
        element={<div>Edit user not implemented</div>}
      />

      <Route path={routes.createEvent} element={<CreateEvent />} />
      <Route
        path={routes.updateEvent}
        element={
          <div>Edit should come here. But... this won't be implemented</div>
        }
      />
      <Route path={routes.viewEvent} element={<div>View event here</div>} />
      <Route path="/me" element={<div>Me components here</div>} />
      <Route path="*" element={<div>No route was hit for admin</div>} />
    </Routes>
  );
}

export default AdminApp;
