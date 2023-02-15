import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/home';
import NotFound404 from '../../pages/not-found';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import IngredientDetailsPage from '../../pages/ingredients-id';
import { checkUser, loginUserThunk, logoutThunk } from "../../services/actions/user";

export default function App() {
  const dispatch = useDispatch();
  

   React.useEffect(() => {
    dispatch(checkUser());
   }, []);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/orders" element={<ProfilePage />} />
        <Route path= "/ingredients/:id" element={<IngredientDetailsPage />} /> 
        <Route path="*" element={<NotFound404 />}/>
      </Routes>
    </BrowserRouter>
  );
}