import React, {useState, useEffect} from 'react';
import LoginForm from "../components/form/login-form";
import Loader from "../components/loader/loader";
import { useSelector, useDispatch } from "react-redux";
import OrderDetailsInfo from '../components/order-details-info/order-details-info'
import {useLocation, useParams} from "react-router-dom";
import FeedPage from "./feed";
import ProfilePage from "./profile";
import ProfileOrders from "../components/profile-orders/profile-orders";
import { useIngredientsCountData } from '../hooks/useIngredientsCountData';
import { wsConnectionStart, wsConnectionClose } from '../services/actions/ws';
import { apiWS } from '../utils/api';
import { getToken } from '../hooks/useTokens';


//import { Breadcrumbs } from '../components/breadcrumbs';

const OrderDetailsPage = () => {
    const {id} = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    //const tokenStorage = useTokenStorage()
    const {orders} = useSelector((store) => store.wsocket);
    //const {orders} = useSelector((store) => store.wsocket);
    //const ordersSelector = useSelector(location.pathname.includes("feed") && orders)

    const order = orders.find(order => order._id === id)

    useEffect(() => { 
      if (location.pathname.includes('profile')) {
        dispatch(wsConnectionStart(apiWS.urlProfile(getToken().replace("Bearer ", ""))));
      } else {
        dispatch(wsConnectionStart(apiWS.urlWS));
      }
      return () => {
        dispatch(wsConnectionClose());
      };
    }, []);
  

  return (
            order
                ?
                <div style={{paddingTop:122}}>
                  <OrderDetailsInfo order={order} />
                </div>
                :
                <Loader />
  );
}

export default OrderDetailsPage;