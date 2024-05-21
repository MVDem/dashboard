import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonUI } from '../../UI';
import { User } from '../../types/User';
import { useTranslate } from '../../tranclations/utils/useTranslation';

type UsersListItemProps = {
  user: User;
};

function UsersListItem({ user }: UsersListItemProps) {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { getTranslations, selectedLanguage } = useTranslate(
    pathname,
    'usersListItem'
  );

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
            {getTranslations({ name: 'btn' })}
          </ButtonUI>
        </td>
      </tr>
    </>
  );
}
export default UsersListItem;
