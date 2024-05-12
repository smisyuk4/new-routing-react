import { useState } from 'react';
import styles from './NewPost.module.css';

export const NewPost = ({ setIsShowModal, handleAddNewPost }) => {
  const handleClickSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const post = {
      title: data.get('title'),
      message: data.get('message'),
    };

    handleAddNewPost(post);
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
