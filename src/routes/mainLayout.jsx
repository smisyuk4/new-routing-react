import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header/Header';
import { PostsList } from '../components/PostsList/PostsList';

const MainLayout = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <Header handleCreateNewPost={setIsShowModal} />

      <main style={{ margin: '2rem 10%' }}>
        {/*<Outlet isShowModal={isShowModal} />*/}
        <PostsList isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      </main>
    </>
  );
};

export default MainLayout;
