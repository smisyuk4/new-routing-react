import styles from './Post.module.css';

export const Post = ({ item }) => {
  const { title, message } = item;
  
  return (
    <li className={styles.post}>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
    </li>
  );
};
