import { useEffect, useState } from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import PropTypes from 'prop-types';
const { VITE_PATH_TO_SERVER, VITE_AUTH_TOKEN } = import.meta.env;

import { Post } from '../Post';
import { Modal } from '../Modal';
import { NewPost } from '../NewPost';
import styles from './PostsList.module.css';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${VITE_AUTH_TOKEN}`,
};

export const PostsList = ({ isShowModal, setIsShowModal }) => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      Loading.standard('Loading...');
      setIsLoad((prev) => false);

      const result = await fetch(`${VITE_PATH_TO_SERVER}/posts`, {
        method: 'GET',
        headers,
      }).then((response) => {
        return response.json();
      });

      Loading.remove();
      setIsLoad((prev) => true);
      setPosts((prev) => result);
    };
    fetchData();
  }, [refresh]);

  return (
    <>
      {isShowModal && (
        <Modal setIsShowModal={setIsShowModal}>
          <NewPost setIsShowModal={setIsShowModal} setRefresh={setRefresh} />
        </Modal>
      )}

      {posts.length > 0 && isLoad && (
        <ul className={styles.postsList}>
          {posts
            .sort((a, b) => b.post_id - a.post_id)
            .map((item, idx) => (
              <Post key={idx} item={item} setRefresh={setRefresh} />
            ))}
        </ul>
      )}

      {posts.length === 0 && isLoad && <p className={styles.error}>No posts</p>}
    </>
  );
};

PostsList.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
  setIsShowModal: PropTypes.func.isRequired,
};
