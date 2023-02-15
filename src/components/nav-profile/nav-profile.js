import { Link, useNavigate, NavLink, useLocation} from "react-router-dom";
import styleProfile from "./nav-profile.module.css";
import {
  logoutThunk
} from "../../services/actions/user";
import {useSelector, useDispatch} from "react-redux";
import {getRefreshToken} from "../../hooks/useTokens";

const NavProfile = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refreshToken = getRefreshToken();
   // console.log(refreshToken);

    const onLogout = (e) => {
      e.preventDefault();
      dispatch(logoutThunk(refreshToken, () => navigate("/login")));
  }

  return (
    <nav className={styleProfile.nav}>
        <NavLink
          to={{ pathname: "/profile" }}
          className={
            location.pathname === "/profile"
              ? `text text_color_primary text_type_main-medium ${styleProfile.link}`
              : `text text_color_inactive text_type_main-medium ${styleProfile.link}`
          }
        >
        Профиль
        </NavLink>
        <NavLink
          to={{ pathname: `/profile/orders` }}
          className={
            location.pathname === "/profile/orders"
              ? `text text_color_primary text_type_main-medium ${styleProfile.link}`
              : `text text_color_inactive text_type_main-medium ${styleProfile.link}`
          }
        >
        История заказов
        </NavLink>
        <Link
          to={{ pathname: `/login` }} onClick={onLogout}
          className={`text text_color_inactive text_type_main-medium ${styleProfile.link}`}
        >
          Выход
        </Link>
        <p
          className={`text text_color_inactive text_type_main-small ${styleProfile.text} mt-20`}
        >
          В этом разделе Вы можете изменить свои персональные данные
        </p>
    </nav>
  );
};

export default NavProfile;
