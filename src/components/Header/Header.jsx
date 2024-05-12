import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

const path = [
  { to: '/', name: 'Home' },
  { to: '/posts', name: 'Posts' },
];

export const Header = ({ handleCreateNewPost }) => {
  return (
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

      <button
        onClick={handleCreateNewPost}
        type='button'
        className={styles.button}
        aria-label='create new post'
      >
        New Post
      </button>
    </header>
  );
};
