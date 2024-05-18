import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import './index.css';
import MainLayout from './routes/mainLayout';
import Posts from './routes/posts';

(() => {
  Loading.init({
    backgroundColor: 'rgba(0,0,0,0.4)',
    svgSize: '90px',
    svgColor: 'rgb(107, 65, 107)',
    messageFontSize: '20px',
    messageColor: 'rgb(255, 255, 255)',
  });
})();

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/posts',
          element: <Posts />,
        },
      ],
    },
  ],
  { basename: '/new-routing-react' }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
