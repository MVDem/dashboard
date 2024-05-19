import { useContext } from 'react';
import styles from './sideBar.module.scss';
import { AuthContext } from '../../context';
import { TranslateContext } from '../../tranclations/context';
import { NavLink } from 'react-router-dom';
import { FaArrowRightFromBracket, FaHouse, FaIdBadge } from 'react-icons/fa6';
import { getTranclation } from '../../tranclations/utils';

function SideBar() {
  const { logout } = useContext(AuthContext);
  const { language } = useContext(TranslateContext);
  const currentTarget = {
    language,
    page: '/',
    block: 'nav',
  };

  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.linkActive : styles.link;

  return (
    <section className={styles.sideBar}>
      <div className={styles.topContainer}>
        <NavLink to={'/'} className={setActive}>
          <FaHouse />
          <p>{getTranclation({ ...currentTarget, name: 'home' })}</p>
        </NavLink>
        <NavLink to={'/users'} className={setActive}>
          <FaIdBadge />
          <p>{getTranclation({ ...currentTarget, name: 'users' })}</p>
        </NavLink>
      </div>
      <div className={styles.bottonContainer}>
        <button onClick={logout} className={styles.link}>
          <FaArrowRightFromBracket />
          <p>{getTranclation({ ...currentTarget, name: 'logout' })}</p>
        </button>
      </div>
    </section>
  );
}
export default SideBar;
