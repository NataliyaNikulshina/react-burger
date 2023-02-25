import NavProfile from "../components/nav-profile/nav-profile";
import ProfileForm from "../components/profile/profile-form";
import { useLocation } from "react-router-dom";
import styleProfile from "./profile.module.css";

const ProfilePage = () => {
  const location = useLocation();

  return (
      <div className={`${styleProfile.container} mt-20`}>
        <NavProfile />
        {location.pathname === "/profile" ? (
          <ProfileForm />
        ) : (
          <p className="text text_type_main-default ">
            Скоро здесь будет история сделанных заказов
          </p>
        )}
      </div>
  );
};

export default ProfilePage;
