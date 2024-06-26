import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignPage from '../pages/SignPage/SignPage';
import Layout from '../pages/Layout/Layout';
import HomePage from '../pages/HomePage/HomePage';
import Private from './PrivateRoutes';
import UsersPage from '../pages/UsersPage/UsersPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import EditPage from '../pages/EditPage/EditPage';

function Routing() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/sign" element={<SignPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Private element={<HomePage />} />} />
            <Route path="/users" element={<Private element={<UsersPage />} />}>
              <Route path="/users/profile/:id" element={<ProfilePage />} />
              <Route path="/users/edit/:id" element={<EditPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default Routing;
