import AppHeader from "../components/app-header/app-header";
import NavProfile from "../components/nav-profile/nav-profile";
import { useLocation} from 'react-router-dom';
import styleProfile from './profile.module.css';


const ProfilePage = () => {
    const location = useLocation()

  return (
    <>
    <AppHeader />
    <div className={`${styleProfile.container}`}>
    <NavProfile/>
        {location.pathname === "/profile"
                    ?
                    <p>dfvsd</p>
                    :
                    <div>1234</div> }
    </div>
    </>
  );
}

export default ProfilePage;