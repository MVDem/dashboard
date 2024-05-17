import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { User } from '../../types/User';
import { ButtonUI } from '../../UI';
import { FaArrowRightLong } from 'react-icons/fa6';
import styles from './profilePage.module.scss';

export type OutletUsersContext = {
  users: User[];
  getData: () => void;
};

function ProfilePage() {
  const { id } = useParams();
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
        <p>User id: {user?.id}</p>
        <p>First name: {user?.firstName}</p>
        <p>Last name: {user?.lastName}</p>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.dob}</p>
      </div>
      <div className={styles.controls}>
        <ButtonUI onClick={() => navigate(`/users/edit/${user?.id}`)}>
          edit
        </ButtonUI>
      </div>
    </div>
  );
}
export default ProfilePage;
