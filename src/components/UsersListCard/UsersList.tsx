import { useContext } from 'react';
import { TranslateContext } from '../../tranclations/context';
import { User } from '../../types/User';
import UsersListItem from '../UsersListItem/UsersListItem';
import styles from './usersList.module.scss';
import { getTranclation } from '../../tranclations/utils';

type UsersListCardProps = {
  users: User[];
};

function UsersListCard({ users }: UsersListCardProps) {
  const { language } = useContext(TranslateContext);
  const currentTarget = {
    language,
    page: '/users',
    block: 'usersListCard',
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.listWrapper}>
        {users?.length ? (
          <table className={styles.list}>
            <thead>
              <tr>
                <th>
                  {getTranclation({
                    ...currentTarget,
                    name: 'table_id',
                  })}
                </th>
                <th>
                  {getTranclation({
                    ...currentTarget,
                    name: 'table_first_name',
                  })}
                </th>
                <th>
                  {getTranclation({
                    ...currentTarget,
                    name: 'table_last_name',
                  })}
                </th>
                <th>
                  {getTranclation({
                    ...currentTarget,
                    name: 'table_email',
                  })}
                </th>
                <th>
                  {getTranclation({
                    ...currentTarget,
                    name: 'table_dob',
                  })}
                </th>
                <th>
                  {getTranclation({
                    ...currentTarget,
                    name: 'table_actions',
                  })}
                </th>
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
