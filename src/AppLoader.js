import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

const AdminApp = React.lazy(() => import('./apps/AdminApp'));
const UserApp = React.lazy(() => import('./apps/UserApp'));

const AppLoader = () => {
  const { userLoggedIn, user } = useSelector((state) => state.auth);

  if (userLoggedIn) {
    switch (user.role) {
      case 'USER::ADMIN': {
        return (
          <Routes>
            <Route path="*" element={<AdminApp />} />
          </Routes>
        );
      }
      default:
        return (
          <Routes>
            <Route path="*" element={<UserApp />} />
          </Routes>
        );
    }
  }

  return <Navigate to="/login" />;
};

export default AppLoader;
