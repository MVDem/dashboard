import { User } from '../../types/User';
import UsersListItem from '../UsersListItem/UsersListItem';
import styles from './usersList.module.scss';
import { useTranslate } from '../../tranclations/utils/useTranslation';
import { useLocation } from 'react-router-dom';

type UsersListCardProps = {
  users: User[];
};

function UsersListCard({ users }: UsersListCardProps) {
  const { pathname } = useLocation();
  const { getTranslations } = useTranslate(pathname, 'usersListCard');

  return (
    <div className={styles.listContainer}>
      <div className={styles.listWrapper}>
        {users?.length ? (
          <table className={styles.list}>
            <thead>
              <tr>
                <th>{getTranslations({ name: 'table_id' })}</th>
                <th>{getTranslations({ name: 'table_first_name' })}</th>
                <th>{getTranslations({ name: 'table_last_name' })}</th>
                <th>{getTranslations({ name: 'table_email' })}</th>
                <th>{getTranslations({ name: 'table_dob' })}</th>
                <th>{getTranslations({ name: 'table_actions' })}</th>
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
