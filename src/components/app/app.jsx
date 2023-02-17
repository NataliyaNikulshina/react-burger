import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from '../../pages/home';
import NotFound404 from '../../pages/not-found';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import IngredientDetailsPage from '../../pages/ingredients-id';
import { checkUser } from "../../services/actions/user";
import ProtectedRouteElement from '../protected-route/protected-route';

export default function App() {
  const dispatch = useDispatch();

  const { isAuth } = useSelector((store) => ({
    isAuth: store.user.isAuth
  }));
  console.log(isAuth)

   React.useEffect(() => {
    dispatch(checkUser());
   }, []);

 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement isAuth={!isAuth}><LoginPage/></ProtectedRouteElement>} /> 
        <Route path="/register" element={<ProtectedRouteElement isAuth={!isAuth}><RegisterPage/></ProtectedRouteElement>} />
        <Route path="/forgot-password" element={<ProtectedRouteElement isAuth={!isAuth}><ForgotPasswordPage/></ProtectedRouteElement>} />
        <Route path="/reset-password" element={<ProtectedRouteElement isAuth={!isAuth}><ResetPasswordPage/></ProtectedRouteElement>} />
        <Route path="/profile" element={<ProtectedRouteElement isAuth={isAuth}><ProfilePage/></ProtectedRouteElement>} />
        <Route path="/profile/orders" element={<ProtectedRouteElement isAuth={isAuth}><ProfilePage/></ProtectedRouteElement>} />
        <Route path= "/ingredients/:id" element={<IngredientDetailsPage />} /> 
        <Route path="*" element={<NotFound404 />}/>
      </Routes>
    </BrowserRouter>
  );
}