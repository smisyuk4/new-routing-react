import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header/Header';

const MainLayout = () => {
  return (
    <>
      <Header />

      <main style={{ margin: '2rem 10%' }}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
