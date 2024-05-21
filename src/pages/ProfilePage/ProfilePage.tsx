import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { User } from '../../types/User';
import { ButtonUI } from '../../UI';
import { FaArrowRightLong } from 'react-icons/fa6';
import styles from './profilePage.module.scss';
import { useTranslate } from '../../tranclations/utils/useTranslation';

export type OutletUsersContext = {
  users: User[];
  getData: () => void;
};

function ProfilePage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { getTranslations } = useTranslate(pathname, '/profile');
  const navigate = useNavigate();
  const { users } = useOutletContext<OutletUsersContext>();
  const user = users.find((user) => user.id === id);
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileTop}>
        <h1>User Profile </h1>
        <ButtonUI onClick={() => navigate('/users')}>
          <FaArrowRightLong />
        </ButtonUI>
      </div>
      <div className={styles.userInfo}>
        <p>
          {getTranslations({ name: 'user_id' })}: {user?.id}
        </p>
        <p>
          {getTranslations({ name: 'user_first_name_en' })}:{' '}
          {user?.firstName_EN}
        </p>
        <p>
          {getTranslations({ name: 'user_last_name_en' })}: {user?.lastName_EN}
        </p>
        <p>
          {getTranslations({ name: 'user_first_name_he' })}:{' '}
          {user?.firstName_HE}
        </p>
        <p>
          {getTranslations({ name: 'user_last_name_he' })}: {user?.lastName_HE}
        </p>
        <p>
          {getTranslations({ name: 'user_email' })}: {user?.email}
        </p>
        <p>
          {getTranslations({ name: 'user_dob' })}: {user?.dob}
        </p>
      </div>
      <div className={styles.controls}>
        <ButtonUI onClick={() => navigate(`/users/edit/${user?.id}`)}>
          {getTranslations({ name: 'edit_btn' })}
        </ButtonUI>
      </div>
    </div>
  );
}
export default ProfilePage;
