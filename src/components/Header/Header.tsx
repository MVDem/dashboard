import { useContext } from 'react';
import LanguageButton from '../../UI/LanguageButton/LanguageButton';
import ThemeButton from '../../UI/ThemeButton/ThemeButton';
import styles from './header.module.scss';
import { AuthContext } from '../../context';
import { useTranslate } from '../../tranclations/utils/useTranslation';
import { useLocation } from 'react-router-dom';

function Header() {
  const { user, isAuth } = useContext(AuthContext);
  const { pathname } = useLocation();
  const { getTranslations } = useTranslate(pathname, 'header');

  return (
    <header className={styles.header}>
      <div className={styles.mainPanel}>
        {getTranslations({ name: 'logo' })}
      </div>
      <div className={styles.rightPanel}>
        {isAuth && <p>{user?.username}</p>}
        <ThemeButton />
        <LanguageButton />
      </div>
    </header>
  );
}
export default Header;
