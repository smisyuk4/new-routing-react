import { useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import PropTypes from 'prop-types';
const { VITE_PATH_TO_SERVER } = import.meta.env;

import styles from './Register.module.css';

export const Register = ({ setIsShowModal, setTypeAuth }) => {
  useEffect(() => {
    setTypeAuth((prev) => 'register');

    return () => {
      setTypeAuth((prev) => 'login');
    };
  }, []);

  const handleClickSubmit = async (event) => {
    event.preventDefault();

    Loading.standard('Loading...');
    const data = new FormData(event.target);

    const user = {
      email: data.get('email'),
      role: data.get('role'),
      password: data.get('password'),
    };
    console.log(user);

    const result = await fetch(`${VITE_PATH_TO_SERVER}/user/register`, {
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
      <h2>REGISTER</h2>

      <label className={styles.label}>
        <p>Email</p>
        <input id='email' name='email' />
      </label>

      <label className={styles.label}>
        <p>Password</p>
        <input id='password' name='password' />
      </label>

      <label className={styles.label}>
        <p>Role</p>
        <select name='role' id='role'>
          <option value=''>--Please choose an option--</option>
          <option value='customer'>Customer</option>
          <option value='author'>Author</option>
          <option value='admin'>Admin</option>
        </select>
      </label>

      <button className={styles.button} aria-label='Submit'>
        Submit
      </button>

      <button
        className={styles.button}
        onClick={() => setTypeAuth((prev) => 'login')}
        type='button'
        aria-label='login'
      >
        Login
      </button>
    </form>
  );
};

Register.propTypes = {
  setIsShowModal: PropTypes.func.isRequired,
  setTypeAuth: PropTypes.func.isRequired,
};
