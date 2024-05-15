import { Admin } from './admin';

export interface IAuthContext {
  user: Admin;
  isAuth: boolean;
  login: (arg: { id: string; username: string }) => void;
  logout: () => void;
}
