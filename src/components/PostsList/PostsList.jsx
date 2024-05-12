import { Post } from '../Post/Post';
import { Modal } from '../Modal/Modal';
import { NewPost } from '../NewPost/NewPost';
import styles from './PostsList.module.css';

let data = [
  { title: '1111', message: 'dsdfsdfsdf = dsdsdsd' },
  { title: '2222222', message: 'sdfswerwrhrthdhbher = sdfsdfsdfsd' },
];

export const PostsList = ({ isShowModal, setIsShowModal }) => {
  const handleAddNewPost = (newPost) => {
    data = [...data, newPost];
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

      <ul className={styles.postsList}>
        {data.map((item, idx) => (
          <Post key={idx} item={item} />
        ))}
      </ul>
    </>
  );
};
