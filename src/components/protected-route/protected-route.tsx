import { FC, ReactElement, ReactNode } from "react";
import { useSelector } from "../../services/hooks";
import { Navigate, useLocation } from "react-router-dom";
import propTypes from "prop-types";

 interface IProtectedRouteProps {
   children: ReactElement<any, any> | null;
   needAuth: boolean;
 }

 const ProtectedRouteElement: FC<IProtectedRouteProps> = ( {children, needAuth} ) => {
  const isAuth = useSelector((store) => store.user.isAuth);
  const location = useLocation();

  if (needAuth ) {
   // console.log('нужна авторизация и она :' + isAuth)
    return isAuth ? children : <Navigate to='/login' />
  }
  else {
    return isAuth ? <Navigate to={location.state?.from ?? '/'} /> : children
  }
}

export default ProtectedRouteElement;