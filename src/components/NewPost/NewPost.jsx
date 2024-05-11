import styles from './NewPost.module.css';

export const NewPost = () => {
  return (
    <form className={styles.form}>
      <label className={styles.label}>
        <p>Title</p>
        <input id='title' />
      </label>

      <label className={styles.label}>
        <p>Message</p>
        <textarea id='message' rows={10} />
      </label>

      <button className={styles.button} type='button' aria-label='Cancel'>
        Cancel
      </button>

      <button className={styles.button} type='button' aria-label='Submit'>
        Submit
      </button>
    </form>
  );
};
