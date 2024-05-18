import { ButtonUI } from '../../UI';
import styles from './addUserCard.module.scss';

function AddUserCard() {
  return (
    <div className={styles.addUser}>
      <ButtonUI>Add User</ButtonUI>
    </div>
  );
}
export default AddUserCard;
