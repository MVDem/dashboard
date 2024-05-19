import { useContext, useEffect } from 'react';
import { TranslateContext } from '../../tranclations/context';
import styles from './languageButtom.module.scss';

function LanguageButton() {
  const { selectedLanguage, setSelectedLanguage } =
    useContext(TranslateContext);

  const langChange = () => {
    if (selectedLanguage === 'EN') {
      setSelectedLanguage!('HE');
    }
    if (selectedLanguage === 'HE') {
      setSelectedLanguage!('EN');
    }
  };

  useEffect(() => {
    document.body.dir = selectedLanguage === 'HE' ? 'rtl' : 'ltr';
  }, [selectedLanguage]);

  return (
    <button
      type="button"
      onClick={langChange}
      className={styles.languageButton}
    >
      <img src={`/flag${selectedLanguage}.svg`} />
    </button>
  );
}
export default LanguageButton;
