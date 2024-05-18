import { useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Confirm } from 'notiflix';
import PropTypes from 'prop-types';
const { VITE_PATH_TO_SERVER } = import.meta.env;

import { selectStateUser } from '../../redux/selectors';
import { Icon } from '../Icon';
import styles from './Post.module.css';

export const Post = ({ item, setRefresh }) => {
  const { post_id, title, message, user_id } = item;
  const user = useSelector(selectStateUser);

  const trimString = (string, number = 30) => {
    if (string.length <= number) {
      return string;
    }

    return `${string.slice(0, number)}...`;
  };

  const handleClickDeletePost = async () => {
    Loading.standard('Loading...');

    Confirm.show(
      'DELETE',
      'Really want to delete post',
      'YES',
      'NO',
      async () => {
        const result = await fetch(`${VITE_PATH_TO_SERVER}/delete-post`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`,
          },
          body: JSON.stringify({ post_id }),
        });

        if (result?.status === 204) {
          Notify.success('Post deleted');
          Loading.remove();
          setRefresh((prev) => !prev);
          return;
        }

        if (result?.status === 403) {
          Notify.failure('Not authorized');
          Loading.remove();
        }
      }
    );

    Loading.remove();
  };

  return (
    <li className={styles.post}>
      {user_id === user?.user_id && (
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
