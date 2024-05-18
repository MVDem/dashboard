import { createContext, useState } from 'react';
import { Admin } from '../types/admin';
import { IAuthContext } from '../types/context';

const initialContext: IAuthContext = {
  user: { id: '', username: '' },
  isAuth: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(initialContext.user);

  const loginHandler = (user: Admin) => {
    setIsAuth(true);
    setUser(user);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setUser(initialContext.user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        login: loginHandler as () => void,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
