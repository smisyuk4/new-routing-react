import styles from './Post.module.css';

export const Post = ({ item }) => {
  const { title, message } = item;

  const trimString = (string, number = 30) => {
    if (string.length <= number) {
      return string;
    }

    return `${string.slice(0, number)}...`;
  };

  return (
    <li className={styles.post}>
      <p className={styles.title}>{trimString(title)}</p>
      <p className={styles.message}>{message}</p>
    </li>
  );
};
