import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import UsersListCard from '../../components/UsersListCard/UsersList';
import PaginationCard from '../../components/PaginationCard/PaginationCard';
import SearchCard from '../../components/SearchCard/SearchCard';
import { SearchParams } from '../../types/SearchParams';
import AnimatedCard from '../../components/AnimatedCard/AnimatedCard';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './usersPage.module.scss';
import AddUserCard from '../../components/AddUserCard/AddUserCars';
import { requests } from '../../components/requests/service/users';

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);
  const [searchParam, setSearchParam] = useState<SearchParams>({
    pagination: {
      page: 1,
      limit: 10,
    },
  });

  useEffect(() => {
    getData();
  }, [searchParam]);

  const getData = async (param = searchParam) => {
    const result = await requests.getUsers(param);
    setUsers(result.users);
    setNumberOfUsers(result.numberOfUsers);
  };

  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <SearchCard setSearchParam={setSearchParam} />
      <PaginationCard
        numberOfUsers={numberOfUsers}
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
