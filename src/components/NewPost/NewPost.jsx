const { VITE_PATH_TO_SERVER, VITE_AUTH_TOKEN } = import.meta.env;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import styles from './NewPost.module.css';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${VITE_AUTH_TOKEN}`,
};

export const NewPost = ({ setIsShowModal }) => {
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
      headers,
      body: JSON.stringify(post),
    });

    if (result?.status === 204) {
      Notify.success('New post added');
      Loading.remove();
      setIsShowModal((prev) => !prev);
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
