import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import PropTypes from 'prop-types';
const { VITE_PATH_TO_SERVER, VITE_AUTH_TOKEN } = import.meta.env;

import styles from './Post.module.css';
import { Icon } from '../Icon';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${VITE_AUTH_TOKEN}`,
};

export const Post = ({ item, setRefresh }) => {
  const { post_id, title, message, user_id } = item;
  const user = 16;

  const trimString = (string, number = 30) => {
    if (string.length <= number) {
      return string;
    }

    return `${string.slice(0, number)}...`;
  };

  const handleClickDeletePost = async () => {
    Loading.standard('Loading...');

    const result = await fetch(`${VITE_PATH_TO_SERVER}/delete-post`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ post_id }),
    });

    if (result?.status === 204) {
      Notify.success('Post removed');
      Loading.remove();
      setRefresh((prev) => !prev);
      return;
    }

    if (result?.status === 403) {
      Notify.failure('Not authorized');
      Loading.remove();
    }

    console.log(result);
    Loading.remove();
  };

  return (
    <li className={styles.post}>
      {user_id === user && (
        <button
          className={styles.button}
          onClick={handleClickDeletePost}
          type='button'
        >
          <Icon id='delete' height={30} width={30} />
        </button>
      )}

      <p className={styles.title}>{trimString(title)}</p>
      <p className={styles.message}>{message}</p>
    </li>
  );
};

Post.propTypes = {
  item: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired,
};
