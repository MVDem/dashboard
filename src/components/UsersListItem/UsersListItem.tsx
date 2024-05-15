import { User } from '../../types/User';
import styles from './usersListItem.module.scss';

function UsersListItem({
  user,
  getData,
  setIsProfileOpen,
  setSelectedUser,
}: {
  user: User;
  getData: () => void;
  setIsProfileOpen: (value: boolean) => void;
  setSelectedUser: (value: User | null) => void;
}) {
  return (
    <>
      <tr>
        <td>{user.id}</td>
        <td>
          <p>{user.firstName}</p>
        </td>
        <td>
          <p>{user.lastName}</p>
        </td>
        <td>
          <p>{user.email}</p>
        </td>
        <td>
          <p>{user.dob}</p>
        </td>
        <td>
          <button
            className={styles.profileButton}
            onClick={() => {
              setSelectedUser(user);
              setIsProfileOpen(true);
            }}
          >
            profile
          </button>
        </td>
      </tr>
    </>
  );
}
export default UsersListItem;
