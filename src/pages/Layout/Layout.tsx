import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './layout.module.scss';
import { AuthContext } from '../../context';
import { FaArrowRightFromBracket, FaHouse, FaIdBadge } from 'react-icons/fa6';
import ThemeButton from '../../UI/ThemeButton/ThemeButton';

function Layout() {
  const { user, isAuth, logout } = useContext(AuthContext);

  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.linkActive : styles.link;

  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <div className={styles.mainPanel}>DashBoard</div>
        <div className={styles.rightPanel}>
          {isAuth && <p>{user?.username}</p>}
          <ThemeButton />
        </div>
      </header>
      <section className={styles.sideBar}>
        <div className={styles.topContainer}>
          <NavLink to={'/'} className={setActive}>
            <FaHouse />
            <p> Home</p>
          </NavLink>
          <NavLink to={'/users'} className={setActive}>
            <FaIdBadge />
            <p> Users</p>
          </NavLink>
        </div>
        <div className={styles.bottonContainer}>
          <button onClick={logout} className={styles.link}>
            <FaArrowRightFromBracket />
            <p> logout</p>
          </button>
        </div>
      </section>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
