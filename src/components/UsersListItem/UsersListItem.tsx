import { useNavigate } from 'react-router-dom';
import { ButtonUI } from '../../UI';
import { User } from '../../types/User';
import { TranslateContext } from '../../tranclations/context';
import { useContext } from 'react';
import { getTranclation } from '../../tranclations/utils';

type UsersListItemProps = {
  user: User;
};

function UsersListItem({ user }: UsersListItemProps) {
  const navigate = useNavigate();
  const { language, selectedLanguage } = useContext(TranslateContext);
  const currentTarget = {
    language,
    page: '/users',
    block: 'usersListItem',
  };

  const handleProfileClick = () => {
    navigate(`/users/profile/${user.id}`);
  };

  return (
    <>
      <tr>
        <td>{user.id}</td>
        <td>
          <p>{user[`firstName_${selectedLanguage!}`]}</p>
        </td>
        <td>
          <p>{user[`lastName_${selectedLanguage!}`]}</p>
        </td>
        <td>
          <p>{user.email}</p>
        </td>
        <td>
          <p>{user.dob}</p>
        </td>
        <td>
          <ButtonUI onClick={handleProfileClick}>
            {getTranclation({
              ...currentTarget,
              name: 'btn',
            })}
          </ButtonUI>
        </td>
      </tr>
    </>
  );
}
export default UsersListItem;
