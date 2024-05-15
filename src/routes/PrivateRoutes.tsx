import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../context';

const Private = ({ element }: { element: JSX.Element }) => {
  const location = useLocation();
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to="/sign" state={{ from: location }} />;
  }
  return element;
};

export default Private;
