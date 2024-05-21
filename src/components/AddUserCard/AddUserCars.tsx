import { ButtonUI } from '../../UI';
import styles from './addUserCard.module.scss';
import { useLocation } from 'react-router-dom';
import { useTranslate } from '../../tranclations/utils/useTranslation';

function AddUserCard() {
  const { pathname } = useLocation();
  const { getTranslations } = useTranslate(pathname, 'addUserCard');

  return (
    <div className={styles.addUser}>
      <ButtonUI>{getTranslations({ name: 'btn' })}</ButtonUI>
    </div>
  );
}
export default AddUserCard;
