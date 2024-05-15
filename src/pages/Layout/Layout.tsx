import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './layout.module.scss';
import { AuthContext } from '../../context';
import { FaArrowRightFromBracket, FaHouse, FaIdBadge } from 'react-icons/fa6';

function Layout() {
  const { user, isAuth, logout } = useContext(AuthContext);

  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <div className={styles.mainPanel}>DashBoard</div>
        <div className={styles.rightPanel}>
          {isAuth && <p>{user?.username}</p>}
        </div>
      </header>
      <section className={styles.sideBar}>
        <div className={styles.topContainer}>
          <NavLink to={'/'} className={styles.link}>
            <FaHouse />
            <p> Home</p>
          </NavLink>
          <NavLink to={'/users'} className={styles.link}>
            <FaIdBadge />
            <p> Users</p>
          </NavLink>
        </div>
        <div className={styles.bottonContainer}></div>
        <button onClick={logout} className={styles.link}>
          <FaArrowRightFromBracket />
          <p> logaut</p>
        </button>
      </section>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
