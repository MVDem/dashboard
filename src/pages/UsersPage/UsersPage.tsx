import { useEffect, useState } from 'react';
import { requests } from '../../server/service/users';
import { User } from '../../types/User';
import UsersList from '../../components/UsersList/UsersList';
import styles from './usersPage.module.scss';
import SearchUsersForm from '../../components/SearchUsersForm/SearchUsersForm';

interface SearchParams {
  searchMethod: string;
  searchValue?: string;
}

function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [users, setUsers] = useState<User[]>();
  const [searchParam, setSearchParam] = useState<SearchParams>({
    searchMethod: 'all',
  });

  useEffect(() => {
    getData();
  }, [page, limit, searchParam]);

  const getData = async (param = searchParam) => {
    switch (param.searchMethod) {
      case 'all':
        requests.getUsers(page, limit).then((data) => {
          setUsers(data);
        });
        break;
      case 'email':
        requests.getUserByEmail(param.searchValue!).then((data) => {
          if (data) {
            setUsers([data]);
          } else {
            setUsers([]);
          }
        });
        break;
      case 'id':
        requests.getUserById(param.searchValue!).then((data) => {
          if (data) {
            setUsers([data]);
          } else {
            setUsers([]);
          }
        });
        break;
    }
  };

  return (
    <>
      <SearchUsersForm setSearchParam={setSearchParam} />
      <div className={styles.pageSettings}>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          prev
        </button>
        <p>{page}</p>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={users?.length! < limit}
        >
          next
        </button>
        <select onChange={(e) => setLimit(+e.target.value)}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <UsersList users={users!} getData={getData} />
    </>
  );
}
export default UsersPage;
