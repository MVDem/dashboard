import { useEffect, useState } from 'react';
import { requests } from '../../server/service/users';
import { User } from '../../types/User';
import UsersListCard from '../../components/UsersListCard/UsersList';
import PaginationCard from '../../components/PaginationCard/PaginationCard';
import SearchCard from '../../components/SearchCard/SearchCard';
import { SearchParams } from '../../types/SearchParams';
import AnimatedCard from '../../components/AnimatedCard/AnimatedCard';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './usersPage.module.scss';

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchParam, setSearchParam] = useState<SearchParams>({
    searchMethod: 'all',
    pagination: {
      page: 1,
      limit: 10,
      numberOfUsers: users?.length,
    },
  });

  useEffect(() => {
    getData();
  }, [searchParam]);

  const getData = async (param = searchParam) => {
    switch (param.searchMethod) {
      case 'all':
        requests
          .getUsers(searchParam.pagination.page, searchParam.pagination.limit)
          .then((data) => {
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

  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <SearchCard setSearchParam={setSearchParam} />
      <PaginationCard
        setSearchParam={setSearchParam}
        searchParam={searchParam}
      />
      <UsersListCard users={users!} />
      <AnimatedCard start={pathname.replace('/users', '').length > 0}>
        <Outlet context={{ users, getData }} />
      </AnimatedCard>
    </div>
  );
}
export default UsersPage;
