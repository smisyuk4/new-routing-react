const { VITE_PATH_TO_SERVER, VITE_AUTH_TOKEN } = import.meta.env;

import styles from './NewPost.module.css';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${VITE_AUTH_TOKEN}`,
};

export const NewPost = ({ setIsShowModal, handleAddNewPost }) => {
  const handleClickSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const post = {
      title: data.get('title'),
      message: data.get('message'),
    };

    //handleAddNewPost(post);
    const result = await fetch(`${VITE_PATH_TO_SERVER}/create-post`, {
      method: 'POST',
      mode: 'no-cors',
      headers,
      body: JSON.stringify(post),
    });

    console.log(result);
    setIsShowModal((prev) => !prev);
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
