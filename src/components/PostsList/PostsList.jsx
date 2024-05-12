import { useEffect, useState } from 'react';
import { Post } from '../Post/Post';
import { Modal } from '../Modal/Modal';
import { NewPost } from '../NewPost/NewPost';
import styles from './PostsList.module.css';
const { VITE_PATH_TO_SERVER, VITE_AUTH_TOKEN } = import.meta.env;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${VITE_AUTH_TOKEN}`,
};

export const PostsList = ({ isShowModal, setIsShowModal }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${VITE_PATH_TO_SERVER}/posts`, {
        method: 'GET',
        headers,
      }).then((response) => {
        return response.json();
      });

      setPosts((prev) => result);
    };
    fetchData();
  }, []);

  const handleAddNewPost = (newPost) => {
    //posts = [...posts, newPost];
  };
  return (
    <>
      {isShowModal && (
        <Modal setIsShowModal={setIsShowModal}>
          <NewPost
            setIsShowModal={setIsShowModal}
            handleAddNewPost={handleAddNewPost}
          />
        </Modal>
      )}

      {posts.length > 0 && (
        <ul className={styles.postsList}>
          {posts.map((item, idx) => (
            <Post key={idx} item={item} />
          ))}
        </ul>
      )}

      {posts.length === 0 && <p className={styles.error}>No posts</p>}
    </>
  );
};
