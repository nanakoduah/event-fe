import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './state';
import Dashboard from './components/dashboard';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import AuthGuard from './components/auth/AuthGuard';
import Notification from './components/notification';
import routes from './routes';
import AppLoader from './AppLoader';
import { AppWrapper } from './components/common';

const { store, persistor } = configureStore();

function App(props) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Notification />
          <Router>
            <AuthGuard>
              <AppWrapper>
                <Routes>
                  <Route path={routes.signin} element={<Signin />} />
                  <Route path={routes.signup} element={<Signup />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="*"
                    element={
                      <React.Suspense>
                        <AppLoader />
                      </React.Suspense>
                    }
                  />
                </Routes>
              </AppWrapper>
            </AuthGuard>
          </Router>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
