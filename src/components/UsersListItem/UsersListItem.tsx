import { useNavigate } from 'react-router-dom';
import { ButtonUI } from '../../UI';
import { User } from '../../types/User';

type UsersListItemProps = {
  user: User;
};

function UsersListItem({ user }: UsersListItemProps) {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate(`/users/profile/${user.id}`);
  };

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
          <ButtonUI onClick={handleProfileClick}>profile...</ButtonUI>
        </td>
      </tr>
    </>
  );
}
export default UsersListItem;
