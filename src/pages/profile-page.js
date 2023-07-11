import styles from './pages.module.css';
import { Outlet } from "react-router-dom";
import { ProfileNavigation } from "../components/profile-navigation/profile-navigation";

export const ProfilePage = () => {

  return (
    <div className={`${styles.profile__page}`}>
    <ProfileNavigation/>
    <Outlet />
    </div>
  )
}