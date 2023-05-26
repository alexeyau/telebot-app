import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '@/pages/app/App.jsx';

import Test from './pages/test/Test.jsx';
import './index.css';


const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/test',
		element: <Test />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
