import React from 'react';
import ReactDOM from 'react-dom/client';

import { createHashRouter, RouterProvider } from 'react-router-dom';

import App from '@/pages/app/App.jsx';
import Settings from '@/pages/settings/Settings.jsx';
import Monitor from '@/pages/monitor/Monitor.jsx';
import Create from '@/pages/create/Create.jsx';
import Tutorial from '@/pages/tutorial/Tutorial.jsx';
import Test from './pages/test/Test.jsx';

import './index.css';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/monitor',
    element: <Monitor />,
  },
  {
    path: '/create',
    element: <Create />,
  },
  {
    path: '/tutorial',
    element: <Tutorial />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
