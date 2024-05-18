import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import PropTypes from 'prop-types';
const { VITE_PATH_TO_SERVER } = import.meta.env;

import styles from './Login.module.css';

export const Login = ({ setIsShowModal, setTypeAuth }) => {
  const handleClickSubmit = async (event) => {
    event.preventDefault();

    Loading.standard('Loading...');
    const data = new FormData(event.target);

    const user = {
      email: data.get('email'),
      password: data.get('password'),
    };

    console.log(user);

    const result = await fetch(`${VITE_PATH_TO_SERVER}/user/login`, {
      method: 'POST',
      body: JSON.stringify(user),
    });

    if (result?.status === 200) {
      console.log(result);
      Notify.success('Hello');
      Loading.remove();
      setIsShowModal((prev) => !prev);
      return;
    }

    if (result?.status === 400) {
      Notify.failure('password and email required or other errors');
      Loading.remove();
    }

    console.log(result);
    Loading.remove();
  };

  return (
    <form className={styles.form} onSubmit={handleClickSubmit}>
      <h2>LOGIN</h2>

      <label className={styles.label}>
        <p>Email</p>
        <input id='email' name='email' />
      </label>

      <label className={styles.label}>
        <p>Password</p>
        <input id='password' name='password' />
      </label>

      <button className={styles.button} aria-label='Submit'>
        Submit
      </button>

      <button
        className={styles.button}
        onClick={() => setTypeAuth((prev) => 'register')}
        type='button'
        aria-label='button'
      >
        Register
      </button>
    </form>
  );
};

Login.propTypes = {
  setIsShowModal: PropTypes.func.isRequired,
  setTypeAuth: PropTypes.func.isRequired,
};
