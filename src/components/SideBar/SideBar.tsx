import { useContext } from 'react';
import styles from './sideBar.module.scss';
import { AuthContext } from '../../context';
import { NavLink } from 'react-router-dom';
import { FaArrowRightFromBracket, FaHouse, FaIdBadge } from 'react-icons/fa6';
import { useTranslate } from '../../tranclations/utils/useTranslation';

function SideBar() {
  const { logout } = useContext(AuthContext);
  const { getTranslations } = useTranslate('/', 'nav');

  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.linkActive : styles.link;

  return (
    <section className={styles.sideBar}>
      <div className={styles.topContainer}>
        <NavLink to={'/'} className={setActive}>
          <FaHouse />
          <p>{getTranslations({ name: 'home' })}</p>
        </NavLink>
        <NavLink to={'/users'} className={setActive}>
          <FaIdBadge />
          <p>{getTranslations({ name: 'users' })}</p>
        </NavLink>
      </div>
      <div className={styles.bottonContainer}>
        <button onClick={logout} className={styles.link}>
          <FaArrowRightFromBracket />
          <p>{getTranslations({ name: 'logout' })}</p>
        </button>
      </div>
    </section>
  );
}
export default SideBar;
