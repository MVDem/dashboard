import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
