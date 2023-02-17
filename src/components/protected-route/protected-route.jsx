import { Navigate } from "react-router-dom";

export default function ProtectedRouteElement({ children, isAuth }) {
  return ( isAuth ? children : <Navigate to={'/'} />);
}