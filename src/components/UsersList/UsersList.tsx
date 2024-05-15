import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import UserProfile from '../UserProfile/UserProfile';
import UsersListItem from '../UsersListItem/UsersListItem';
import styles from './usersList.module.scss';

function UsersList({ users, getData }: { users: User[]; getData: () => void }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [animationStart, setAnimationStart] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  useEffect(() => {
    if (isProfileOpen) {
      setAnimationStart(false);
    } else {
      setAnimationStart(true);
    }
  }, [isProfileOpen]);

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
                  return (
                    <UsersListItem
                      key={i}
                      user={user}
                      getData={getData}
                      setSelectedUser={setSelectedUser}
                      setIsProfileOpen={setIsProfileOpen}
                    />
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )}
        {isProfileOpen && selectedUser && (
          <div
            className={
              animationStart
                ? styles.profileContainer
                : styles.profileContainerActive
            }
          >
            <UserProfile
              selectedUser={selectedUser}
              setIsProfileOpen={setIsProfileOpen}
              getData={getData}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default UsersList;
