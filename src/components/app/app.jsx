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
import ProfileOrders from '../profile-orders/profile-orders';
import FeedPage from '../../pages/feed';
import OrderDetailsPage from '../../pages/order-details';
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
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/ws";
import { apiWS } from "../../utils/api";
import OrderDetailsInfo from "../order-details-info/order-details-info";

export default function App() {
  const isLoading = useSelector((state) => state.ingredients.itemsRequest);
  const isLoadingUser = useSelector((state) => state.user.checkUserRequest);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state?.background;
  const backgroundFeed = location.state?.locationFeed ||
     location.state?.locationProfile ||
     location;
  const navigate = useNavigate();
  const {orders} = useSelector((store) => store.wsocket);
  useEffect(() => {
    dispatch(wsConnectionStart(apiWS.urlWS));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, []);

   // useEffect(() => {
    //     if (!ingredients.length) dispatch(getIngredientsThunk())
    // }, [dispatch, ingredients])
    // useEffect(() => {
    //     if (!orders.length) {
    //         if (location.pathname.includes("feed")) {
    //             dispatch(feedOrdersWebSocketStartConnectAction(websocketUrl.allFeedUrl))
    //             return () => dispatch(feedOrdersWebSocketCloseConnectAction())
    //         } else {
    //             dispatch(userOrdersWebSocketStartConnectAction(websocketUrl.userFeed(tokenStorage.getToken().replace("Bearer ", ""))))
    //             return () => dispatch(userOrdersWebSocketCloseConnectAction())
    //         }
    //     }
    // }, [dispatch, location, orders, tokenStorage])


  useEffect(() => {
    dispatch(checkUser());
  }, []);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  //console.log(isLoading, isLoadingUser)
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

    const [visibilityOrder, changeVisibilityOrder] = useState(false);

    const onCloseOrder = () => {
      changeVisibilityOrder(false);
      navigate(-1);
    };

    useEffect(() => {
      if (location.state?.locationFeed || location.state?.locationProfile) {
        //dispatch(addIngredientDetails(location.state.ingredient));
        changeVisibilityOrder(true)
      }
    }, [location.state])

    // console.log(location.state?.locationFeed )
    // console.log(location.state )

  return ( 
    (!isLoading && isLoadingUser===false && orders) ? 
    <>
      <AppHeader />
      <Routes location={background || location || backgroundFeed}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement needAuth={false}><LoginPage/></ProtectedRouteElement>} /> 
        <Route path="/register" element={<ProtectedRouteElement needAuth={false}><RegisterPage/></ProtectedRouteElement>} />
        <Route path="/forgot-password" element={<ProtectedRouteElement needAuth={false}><ForgotPasswordPage/></ProtectedRouteElement>} />
        <Route path="/reset-password" element={<ProtectedRouteElement needAuth={false}><ResetPasswordPage/></ProtectedRouteElement>} />
        <Route  path="/profile">
          <Route index element={<ProtectedRouteElement needAuth={true}><ProfilePage/></ProtectedRouteElement>} />
          <Route  path="orders">
            <Route index element={<ProtectedRouteElement needAuth={true}><ProfilePage/></ProtectedRouteElement>} />
            <Route  path=":id" element={<ProtectedRouteElement needAuth={true}><OrderDetailsPage/></ProtectedRouteElement>} />
          </Route>
        </Route>
        <Route path="/feed" element={<FeedPage/>} >
              {location.state?.from === "feed" && orders && (
              <Route path=":id" element={<Modal onClose={onCloseOrder} children={<OrderDetailsInfo order={location.state.order} />} />} />)}
        </Route>
        <Route path="/feed/:id" element={<OrderDetailsPage/>} />
        <Route path= "/ingredients/:id" element={<IngredientDetailsPage />} /> 
        <Route path="*" element={<NotFound404 />}/>
      </Routes>
       {background && <Modal onClose={onClose} title={'Детали ингредиента'}><IngredientDetailsFunc /></Modal>}             
        {/* {location.state?.locationFeed && orders && (
              <Modal onClose={onCloseOrder} children={<OrderDetailsInfo order={location.state.order} />} />)} */}
       {location.state?.locationProfile && orders && (
              <Modal onClose={onCloseOrder}>
                <OrderDetailsInfo />
              </Modal>)}  
   </> 
    : 
    <Loader /> 
  );
}