import styles from './Post.module.css';
import { Icon } from '../Icon';

export const Post = ({ item }) => {
  const { title, message, user_id } = item;
  const user = 16;

  const trimString = (string, number = 30) => {
    if (string.length <= number) {
      return string;
    }

    return `${string.slice(0, number)}...`;
  };

  return (
    <li className={styles.post}>
      {user_id === user && (
        <button className={styles.button} type='button'>
          <Icon id='delete' height={30} width={30} />
        </button>
      )}

      <p className={styles.title}>{trimString(title)}</p>
      <p className={styles.message}>{message}</p>
    </li>
  );
};
