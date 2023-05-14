import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './styles/variable.scss';
import store from './states';

const root = createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="1081597540-tis2j04e2u9una1fesid562gcvbqpsoj.apps.googleusercontent.com">
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </GoogleOAuthProvider>,
);
