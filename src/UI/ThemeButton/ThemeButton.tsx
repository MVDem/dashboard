import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import styles from './themeButton.module.scss';
import { useState } from 'react';

function ThemeButton() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme')
  );
  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      setTheme('dark');
    }
  };

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return (
    <button type="button" className={styles.themeBtn} onClick={toggleTheme}>
      {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
    </button>
  );
}
export default ThemeButton;
