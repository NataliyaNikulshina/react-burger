import {useCallback, useEffect, useMemo, useState, FC} from 'react';
import NavProfile from "../components/nav-profile/nav-profile";
import ProfileForm from "../components/profile/profile-form";
import { useLocation, Outlet } from "react-router-dom";
import styleProfile from "./profile.module.css";
import ProfileOrders from "../components/profile-orders/profile-orders";
import { apiWS } from "../utils/api";
import { useSelector, useDispatch } from "../services/hooks";
import { getToken, getRefreshToken } from "../hooks/useTokens";
import {
    wsConnectionStart,
    wsConnectionClose,
  } from "../services/actions/feed-ws";
import Loader from "../components/loader/loader";
import { getItems } from "../services/actions/ingredients";
  

const ProfilePage: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = getToken();
  //console.log(token)
  const {orders} = useSelector((store) => store.wsocketUser);
  //console.log(orders)

   useEffect(() => {
    //dispatch(getItems());
    dispatch(wsConnectionStart(apiWS.urlProfile(token!.replace("Bearer ", ""))))
    return () => {
      dispatch(wsConnectionClose());
    };
  }, []);
     
  return (
    orders.length 
    ?
    <>
      <div className={`${styleProfile.container} mt-20`}>
        <NavProfile />
        {location.pathname === "/profile" ? 
          <ProfileForm />
         : 
          <ProfileOrders/>
        }
      </div>
      <Outlet/>
    </>
     :
     <Loader/>
  );
};

export default ProfilePage;
