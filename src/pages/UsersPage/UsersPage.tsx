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
import AddUserCard from '../../components/AddUserCard/AddUserCars';

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
  console.log('searchParam', searchParam, users);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (param = searchParam) => {
    switch (param.searchMethod) {
      case 'all':
        const result = await requests.getUsers(
          searchParam.pagination.page,
          searchParam.pagination.limit
        );
        setUsers(result);
        setSearchParam((prev) => {
          return {
            ...prev,
            pagination: {
              ...prev.pagination,
              numberOfUsers: result?.length,
            },
          };
        });

        break;
      case 'email':
        const result1 = await requests.getUserByEmail(param.searchValue!);
        if (!result1) return setUsers([]);
        setUsers([result1]);
        setSearchParam((prev) => {
          return {
            ...prev,
            pagination: {
              ...prev.pagination,
              numberOfUsers: 1,
            },
          };
        });
        break;
      case 'id':
        const result2 = await requests.getUserById(param.searchValue!);
        if (!result2) return setUsers([]);
        setUsers([result2]);
        setSearchParam((prev) => {
          return {
            ...prev,
            pagination: {
              ...prev.pagination,
              numberOfUsers: 1,
            },
          };
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
      <AddUserCard />
      <UsersListCard users={users!} />
      <AnimatedCard start={pathname.replace('/users', '').length > 0}>
        <Outlet context={{ users, getData }} />
      </AnimatedCard>
    </div>
  );
}
export default UsersPage;
