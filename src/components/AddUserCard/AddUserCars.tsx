import { useContext } from 'react';
import { ButtonUI } from '../../UI';
import { TranslateContext } from '../../tranclations/context';
import styles from './addUserCard.module.scss';
import { getTranclation } from '../../tranclations/utils';

function AddUserCard() {
  const { language } = useContext(TranslateContext);
  const currentTarget = {
    language,
    page: '/users',
    block: 'addUserCard',
  };
  return (
    <div className={styles.addUser}>
      <ButtonUI>{getTranclation({ ...currentTarget, name: 'btn' })}</ButtonUI>
    </div>
  );
}
export default AddUserCard;
