import type { CreateUser, User } from '../types/User';
import { encryptStr } from '../utils/encryptStr';
import makeUUID from '../utils/makeUUID';
import parseDate from '../utils/parseDate';
import users from '../mocks/jsons/users2.json';
import { SearchParams } from '../../types/SearchParams';
// MOCK METHODS

const USERS: User[] = [...users];

// create a user
export const createUser = async (
  user: CreateUser
): Promise<{ id: string } | { error: string }> => {
  try {
    // check valid email
    if (!user.email.includes('@')) {
      throw new Error('Invalid email');
    }
    // check valid dob
    const validDate = parseDate(user.dob!);
    if (!validDate) {
      throw new Error('Invalid dob');
    }
    const newUser = user as User;
    newUser.id = makeUUID();
    newUser.password = encryptStr(newUser.password);
    USERS.push(newUser);
    return { id: newUser.id };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

// update a user
export const updateUser = async (
  id: string,
  user: CreateUser
): Promise<boolean> => {
  const index = USERS.findIndex((u) => u.id === id);
  if (index === -1) {
    return false;
  }
  USERS[index] = { ...user, id };
  return true;
};

// get users paginated
export const getUsers = async (
  params: SearchParams
): Promise<{ users: User[]; numberOfUsers: number }> => {
  let AllUsers: User[];
  if (params.searchMethod) {
    AllUsers = [
      ...USERS.filter((user) => {
        return user[params.searchMethod as keyof User]?.includes(
          params.searchValue!
        );
      }),
    ];
  } else {
    AllUsers = [...USERS];
  }

  const numberOfUsers = AllUsers.length;
  const users = AllUsers.slice(
    (params.pagination.page - 1) * params.pagination.limit,
    params.pagination.page * params.pagination.limit
  );
  return { users, numberOfUsers };
};

// delete a user by id
export const deleteUserById = async (id: string): Promise<boolean> => {
  const index = USERS.findIndex((user) => user.id === id);
  if (index === -1) {
    return false;
  }
  USERS.splice(index, 1);
  return true;
};

export const requests = {
  createUser,
  updateUser,
  getUsers,
  deleteUserById,
};
