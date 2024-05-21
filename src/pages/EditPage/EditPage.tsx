import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import styles from './editPage.module.scss';
import { ButtonUI, InputUI } from '../../UI';
import { useState } from 'react';
import { User } from '../../types/User';
import { OutletUsersContext } from '../ProfilePage/ProfilePage';
import DeleteMessage from '../../UI/DeleteMessage/DeleteMessage';
import { FaArrowRightLong } from 'react-icons/fa6';
import { requests } from '../../requests/service/users';
import { useTranslate } from '../../tranclations/utils/useTranslation';

const userKeys = ['firstName', 'lastName', 'email', 'dob'];

function EditPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { getTranslations, selectedLanguage } = useTranslate(pathname, '/edit');
  const navigate = useNavigate();
  const { users, getData } = useOutletContext<OutletUsersContext>();
  const user = users.find((user) => user.id === id);
  const [userEdit, setUserEdit] = useState<User>(user!);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const handleUpdate = async () => {
    const result = await requests.updateUser(id!, userEdit);
    if (result) {
      getData();
      navigate(`/users/profile/${id}`);
    }
  };

  const handleDelete = async () => {
    const result = await requests.deleteUserById(id!);
    if (result) {
      getData();
      setDeleteMode(false);
      navigate('/users');
    }
  };
  const userFullName =
    user![`firstName_${selectedLanguage!}`] +
    ' ' +
    user![`lastName_${selectedLanguage!}`];

  return (
    <>
      {deleteMode ? (
        <DeleteMessage
          message={getTranslations({ name: 'delete_message' }).replace(
            '[name]',
            userFullName
          )}
          callBack={handleDelete}
          onStop={() => setDeleteMode(false)}
        />
      ) : (
        <div className={styles.profileWrapper}>
          <div className={styles.profileTop}>
            <h1>User Profile </h1>
            <ButtonUI onClick={() => navigate(`/users/profile/${id}`)}>
              <FaArrowRightLong />
            </ButtonUI>
          </div>

          <div className={styles.userInfo}>
            {user &&
              userKeys.map((key, i) => {
                if (key === 'id') {
                  return <p>User id: {user.id}</p>;
                } else {
                  return (
                    <InputUI
                      key={i}
                      label={key}
                      type="text"
                      value={userEdit[key as keyof User]}
                      onChange={(e) =>
                        setUserEdit({
                          ...user,
                          [key]: e.target.value,
                        })
                      }
                    />
                  );
                }
              })}
          </div>
          <div className={styles.controls}>
            <ButtonUI type="button" onClick={handleUpdate}>
              {getTranslations({ name: 'update_btn' })}
            </ButtonUI>
            <ButtonUI onClick={() => setUserEdit(user!)}>
              {getTranslations({ name: 'reset_btn' })}
            </ButtonUI>
            <ButtonUI onClick={() => setDeleteMode(true)}>
              {getTranslations({ name: 'delete_btn' })}
            </ButtonUI>
          </div>
        </div>
      )}
    </>
  );
}
export default EditPage;
