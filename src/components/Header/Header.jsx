import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

const path = [
  { to: '/', name: 'Home' },
  { to: '/posts', name: 'Posts' },
];

export const Header = () => {
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
                    color: isActive ? 'red' : '',
                  };
                }}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
