import { Post } from '../Post/Post';
import styles from './PostsList.module.css';

const data = [
  { author: '1111', text: 'dsdfsdfsdf = dsdsdsd' },
  { author: '2222222', text: 'sdfswerwrhrthdhbher = sdfsdfsdfsd' },
];

export const PostsList = () => {
  return (
    <ul className={styles.postsList}>
      {data.map((item, idx) => (
        <Post key={idx} item={item} />
      ))}
    </ul>
  );
};
