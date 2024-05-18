import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Icon } from '../Icon';
import { Modal } from '../Modal';
import { Login } from '../Login';
import { Register } from '../Register';
import styles from './Header.module.css';

const path = [
  { to: '/', name: 'Home' },
  { to: '/posts', name: 'Posts' },
];

export const Header = ({ handleCreateNewPost }) => {
  const [isShowAuth, setIsShowAuth] = useState(false);
  const [typeAuth, setTypeAuth] = useState('login');

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max) + 1;
  };

  const handleClickAuth = async () => {};
  return (
    <>
      {isShowAuth && (
        <Modal setIsShowModal={setIsShowAuth}>
          {typeAuth === 'login' ? (
            <Login setIsShowModal={setIsShowAuth} setTypeAuth={setTypeAuth} />
          ) : (
            <Register
              setIsShowModal={setIsShowAuth}
              setTypeAuth={setTypeAuth}
            />
          )}
        </Modal>
      )}

      <header className={styles.header}>
        <nav id='sidebar'>
          <ul className={styles.navList}>
            {path.map(({ to, name }) => (
              <li key={name}>
                <NavLink
                  to={to}
                  style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? 'bold' : '',
                      color: isActive ? 'rgb(107, 65, 107)' : '',
                    };
                  }}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.buttonsWrp}>
          <button
            onClick={() => handleCreateNewPost((prev) => !prev)}
            type='button'
            className={styles.button}
            aria-label='create new post'
          >
            New Post
          </button>

          <button
            onClick={() => setIsShowAuth((prev) => !prev)}
            type='button'
            className={styles.authButton}
            aria-label='auth'
          >
            <Icon id={`avatar-0`} height={30} width={30} />
            {/*<Icon id={`avatar-${getRandomNumber(5)}`} height={30} width={30} />*/}
          </button>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  handleCreateNewPost: PropTypes.func.isRequired,
};
