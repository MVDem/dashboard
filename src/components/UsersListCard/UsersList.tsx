import { User } from '../../types/User';
import UsersListItem from '../UsersListItem/UsersListItem';
import styles from './usersList.module.scss';

type UsersListCardProps = {
  users: User[];
};

function UsersListCard({ users }: UsersListCardProps) {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listWrapper}>
        {users?.length ? (
          <table className={styles.list}>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, i) => {
                  return <UsersListItem key={i} user={user} />;
                })}
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}
export default UsersListCard;
