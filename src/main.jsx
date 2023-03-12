import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { isTouch } from 'utils/helpers';
import 'utils/inner-height-variable';

import App from 'components/App/App';

import 'styles/index.scss';

import './i18n/i18n';

if (isTouch) {
  document.body.classList.add('has-touch');
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ToastContainer style={{ fontSize: '12px' }} />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
