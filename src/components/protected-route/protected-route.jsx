import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

export default function ProtectedRouteElement({ children, isAuth }) {
  return ( isAuth ? children : <Navigate to={'/'} />);
}

ProtectedRouteElement.propTypes = {
  children: propTypes.element.isRequired,
  isAuth: propTypes.bool.isRequired,
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
