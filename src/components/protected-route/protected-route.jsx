import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

export default function ProtectedRouteElement({ children, isAuth }) {
  return ( isAuth ? children : <Navigate to={'/'} />);
}

ProtectedRouteElement.propTypes = {
  children: propTypes.element.isRequired,
  isAuth: propTypes.bool.isRequired,
}
