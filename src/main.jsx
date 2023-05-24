import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '@/pages/app/App.jsx';
import Test from './pages/test/Test.jsx';
import Settings from '@/pages/settings/Settings.jsx';
import Monitor from '@/pages/monitor/Monitor.jsx';
import Create from '@/pages/create/Create.jsx';
import './index.css';

import store from '@services/Redux-store';


const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
	},
	{
		path: '/test',
		element: <Test appState={store.getState()} dispatch={store.dispatch.bind(store)}/>,
	},
	{
		path: '/settings',
		element: <Settings/>,
	},
	{
		path: '/monitor',
		element: <Monitor/>,
	},
	{
		path: '/create',
		element: <Create />,
	},
]);

let rerenderEntireTree = () => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</React.StrictMode>
	);
}

rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});

