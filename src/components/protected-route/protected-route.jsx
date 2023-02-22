import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import propTypes from "prop-types";

// export default function ProtectedRouteElement({ children, isAuth, anonymous = false }) {
//   const location = useLocation();
//    // Если разрешен неавторизованный доступ, а пользователь авторизован...
//   if ( isAuth && anonymous) { return <Navigate to={location.state?.from || "/"}/>};
//   // Если требуется авторизация, а пользователь не авторизован...
//   if ( !isAuth && !anonymous) { return <Navigate to="/login" />};
//   return children;
// }
export default function ProtectedRouteElement({ children, needAuth }) {
   
  const isAuth = useSelector((store) => store.user.isAuth);
  const location = useLocation();

  if (needAuth) {
    return isAuth ? children : <Navigate to='/login' />
  }
  else {
    return isAuth ? <Navigate to={location.state?.from ?? '/'} /> : children
  }
}

ProtectedRouteElement.propTypes = {
  children: propTypes.element.isRequired,
  needAuth: propTypes.bool.isRequired,
}

// export default function ProtectedRoute({ children, anonymous = false }) {
//   const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

//   const location = useLocation();
//   const from = location.state?.from || '/';
//   // Если разрешен неавторизованный доступ, а пользователь авторизован...
//   if (anonymous && isLoggedIn) {
//     // ...то отправляем его на предыдущую страницу
//     return <Navigate to={ from } />;
//   }

//   // Если требуется авторизация, а пользователь не авторизован...
//   if (!anonymous && !isLoggedIn) {
//     // ...то отправляем его на страницу логин
//     return <Navigate to="/login" state={{ from: location}}/>;
//   }

//   // Если все ок, то рендерим внутреннее содержимое
//   return children;
// }
