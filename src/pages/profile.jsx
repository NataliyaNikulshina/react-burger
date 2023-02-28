import NavProfile from "../components/nav-profile/nav-profile";
import ProfileForm from "../components/profile/profile-form";
import { useLocation } from "react-router-dom";
import styleProfile from "./profile.module.css";
import ProfileOrders from "../components/profile-orders/profile-orders";

const ProfilePage = () => {
  const location = useLocation();

  return (
      <div className={`${styleProfile.container} mt-20`}>
        <NavProfile />
        {location.pathname === "/profile" ? 
          <ProfileForm />
         : 
          <ProfileOrders/>
        }
      </div>
  );
};

export default ProfilePage;
