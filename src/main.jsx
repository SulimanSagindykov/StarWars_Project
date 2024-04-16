import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapMainSection from './components/WrapMainSection/WrapMainSection';
import About from './components/About/About';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Planet from './components/Planet/Planet';

import { NavLink } from 'react-router-dom';
import Search from './components/Search/Search';
import InvalidPage from './components/404/404';
const router = createBrowserRouter([
  {
    path: '/',
    element: <WrapMainSection />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/planets/:name',
    element: <Planet />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '*',
    element: <InvalidPage />,
  },
]);

{
  /* <Navbar />
        <Switch>
          
        </Switch> */
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
