import { useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import PropTypes from 'prop-types';
const { VITE_PATH_TO_SERVER } = import.meta.env;

import { selectStateUser } from '../../redux/selectors';
import styles from './NewPost.module.css';

export const NewPost = ({ setIsShowModal, setRefresh }) => {
  const user = useSelector(selectStateUser);

  const handleClickSubmit = async (event) => {
    event.preventDefault();

    Loading.standard('Loading...');
    const data = new FormData(event.target);

    const post = {
      title: data.get('title'),
      message: data.get('message'),
    };

    const result = await fetch(`${VITE_PATH_TO_SERVER}/create-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(post),
    });

    if (result?.status === 204) {
      Notify.success('New post added');
      Loading.remove();
      setIsShowModal((prev) => !prev);
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
    <form className={styles.form} onSubmit={handleClickSubmit}>
      <label className={styles.label}>
        <p>Title</p>
        <input id='title' name='title' />
      </label>

      <label className={styles.label}>
        <p>Message</p>
        <textarea id='message' name='message' rows={10} />
      </label>

      <div>
        <button
          className={styles.button}
          onClick={() => setIsShowModal((prev) => !prev)}
          type='button'
          aria-label='Cancel'
        >
          Cancel
        </button>

        <button className={styles.button} aria-label='Submit'>
          Submit
        </button>
      </div>
    </form>
  );
};

NewPost.propTypes = {
  setIsShowModal: PropTypes.func.isRequired,
  setRefresh: PropTypes.func.isRequired,
};
