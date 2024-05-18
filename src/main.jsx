import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import './index.css';
import MainLayout from './routes/mainLayout';
import Posts from './routes/posts';
import { store, persistor } from './redux/store';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
