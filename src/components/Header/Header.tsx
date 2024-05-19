import { useContext } from 'react';
import LanguageButton from '../../UI/LanguageButton/LanguageButton';
import ThemeButton from '../../UI/ThemeButton/ThemeButton';
import { getTranclation } from '../../tranclations/utils';
import styles from './header.module.scss';
import { AuthContext } from '../../context';
import { TranslateContext } from '../../tranclations/context';

function Header() {
  const { user, isAuth } = useContext(AuthContext);
  const { language } = useContext(TranslateContext);
  const currentTarget = {
    language,
    page: '/',
    block: 'header',
  };
  return (
    <header className={styles.header}>
      <div className={styles.mainPanel}>
        {getTranclation({ ...currentTarget, name: 'logo' })}
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
