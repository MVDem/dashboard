import { FaArrowRightLong } from 'react-icons/fa6';
import { User } from '../../types/User';
import styles from './userProfile.module.scss';
import { useRef, useState } from 'react';
import { requests } from '../../server/service/users';

function UserProfile({
  selectedUser,
  setIsProfileOpen,
  getData,
}: {
  selectedUser: User;
  setIsProfileOpen: (value: boolean) => void;
  getData: () => void;
}) {
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<User>(selectedUser);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleDelete = (id: string) => {
    setDeleteMessage(
      `User ${selectedUser.firstName} ${selectedUser.lastName} is Deleting...`
    );
    timer.current = setTimeout(async () => {
      const result = await requests.deleteUserById(id);
      const isDelete = result;
      if (isDelete) {
        getData();
        setDeleteMessage(null);
        setIsProfileOpen(false);
      } else {
        console.log('The user was not deleted', isDelete);
        setDeleteMessage('The user was not deleted');
      }
    }, 3000);
  };

  const handleStopDelete = () => {
    clearTimeout(timer.current!);
    setDeleteMessage(null);
  };

  const handleUpdate = async () => {
    const result = await requests.updateUser(selectedUser.id, userEdit);
    if (result) {
      getData();
      setEditMode(false);
    }
  };
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileTop}>
        <h1>User Profile </h1>
        <button onClick={() => setIsProfileOpen(false)}>
          <FaArrowRightLong />
        </button>
      </div>
      {deleteMessage ? (
        <>
          <p>{deleteMessage}</p>
          <button onClick={handleStopDelete}>cancel</button>
        </>
      ) : (
        <div className={styles.userInfo}>
          <p>User id: {selectedUser?.id}</p>

          {!editMode ? (
            <p>User first name: {selectedUser?.firstName}</p>
          ) : (
            <label>
              User first name:
              <input
                type="text"
                value={userEdit.firstName}
                onChange={(e) =>
                  setUserEdit({ ...userEdit, firstName: e.target.value })
                }
              />
            </label>
          )}
          {!editMode ? (
            <p>User last name: {selectedUser?.lastName}</p>
          ) : (
            <label>
              User last name:
              <input
                type="text"
                value={userEdit.lastName}
                onChange={(e) =>
                  setUserEdit({ ...userEdit, lastName: e.target.value })
                }
              />{' '}
            </label>
          )}
          {!editMode ? (
            <p>User email: {selectedUser?.email}</p>
          ) : (
            <label>
              User email:
              <input
                type="text"
                value={userEdit.email}
                onChange={(e) =>
                  setUserEdit({ ...userEdit, email: e.target.value })
                }
              />
            </label>
          )}
          {!editMode ? (
            <p>User date of birth:: {selectedUser?.dob}</p>
          ) : (
            <label>
              User date of birth:
              <input
                type="text"
                value={userEdit.dob}
                onChange={(e) =>
                  setUserEdit({ ...userEdit, dob: e.target.value })
                }
              />
            </label>
          )}
        </div>
      )}
      <div className={styles.userActions}>
        {!editMode ? (
          !deleteMessage && (
            <>
              <button onClick={() => setEditMode(!editMode)}>edit</button>
              <button onClick={() => handleDelete(selectedUser.id)}>
                delete
              </button>
            </>
          )
        ) : (
          <>
            <button type="button" onClick={handleUpdate}>
              update
            </button>
            <button onClick={() => setUserEdit(selectedUser)}>reset</button>
          </>
        )}
      </div>
    </div>
  );
}
export default UserProfile;
