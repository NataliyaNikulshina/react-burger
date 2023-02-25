import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route} from 'react-router-dom';
import HomePage from '../../pages/home';
import NotFound404 from '../../pages/not-found';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import FeedPage from '../../pages/feed';
import IngredientDetailsPage from '../../pages/ingredients-id';
import { checkUser } from "../../services/actions/user";
import ProtectedRouteElement from '../protected-route/protected-route';
import AppHeader from "../app-header/app-header";
import { getItems } from "../../services/actions/ingredients";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../modal/modal";
import { useEffect, useState } from "react";
import IngredientDetailsFunc from '../ingredient-details/ingredient-details';
import { addIngredientDetails } from '../../services/actions/ingredient-details';
import Loader from "../loader/loader";

export default function App() {
  const isLoading = useSelector((state) => state.ingredients.itemsRequest);
  const isLoadingUser = useSelector((state) => state.user.checkUserRequest);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state?.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  console.log(isLoading, isLoadingUser)
  const [visibility, changeVisibility] = useState(false);

  const onClose = () => {
    changeVisibility(false);
    navigate('/');
  };
 
  useEffect(() => {
      if (location.state?.ingredient) {
        dispatch(addIngredientDetails(location.state.ingredient));
        changeVisibility(true)
      }
    }, [location.state])

  return ( 
    (!isLoading && isLoadingUser===false) ? 
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement needAuth={false}><LoginPage/></ProtectedRouteElement>} /> 
        <Route path="/register" element={<ProtectedRouteElement needAuth={false}><RegisterPage/></ProtectedRouteElement>} />
        <Route path="/forgot-password" element={<ProtectedRouteElement needAuth={false}><ForgotPasswordPage/></ProtectedRouteElement>} />
        <Route path="/reset-password" element={<ProtectedRouteElement needAuth={false}><ResetPasswordPage/></ProtectedRouteElement>} />
        <Route path="/profile" element={<ProtectedRouteElement needAuth={true}><ProfilePage/></ProtectedRouteElement>} />
        <Route path="/profile/orders" element={<ProtectedRouteElement needAuth={true}><ProfilePage/></ProtectedRouteElement>} />
        <Route path= "/profile/orders/:id" element={<ProtectedRouteElement needAuth={true}><ProfilePage/></ProtectedRouteElement>} />
        <Route  path="/profile">
          <Route index element={<ProtectedRouteElement needAuth={true}><ProfilePage/></ProtectedRouteElement>}/>
          <Route  path="orders" >
              <Route index element={<ProtectedRouteElement needAuth={true}><ProfilePage/></ProtectedRouteElement>}/>
              <Route  path=":id" element={<ProtectedRouteElement needAuth={true}><ProfilePage/></ProtectedRouteElement>}/>
           </Route>
        </Route>
        <Route  path="/feed">
          <Route index element={<FeedPage/>} />
          <Route  path=":id" element={<ProfilePage/>} />
        </Route>
        <Route path= "/ingredients/:id" element={<IngredientDetailsPage />} /> 
        <Route path="*" element={<NotFound404 />}/>
      </Routes>
      {background && <Modal onClose={onClose} title={'Детали ингредиента'}><IngredientDetailsFunc /></Modal>}            
   </> 
    : 
    <Loader /> 
  );
}