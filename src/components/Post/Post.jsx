import styles from './Post.module.css';

export const Post = ({ item }) => {
  const { author, text } = item;
  
  return (
    <li className={styles.post}>
      <p className={styles.author}>{author}</p>
      <p className={styles.text}>{text}</p>
    </li>
  );
};
