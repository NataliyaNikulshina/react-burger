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


//import { Breadcrumbs } from '../components/breadcrumbs';

const OrderDetailsPage = () => {
    const {id} = useParams()
    const location = useLocation()
    //const dispatch = useDispatch()
   // const tokenStorage = useTokenStorage()
    const {orders} = useSelector((store) => store.wsocket);
    //const {orders} = useSelector((store) => store.wsocket);
    //const ordersSelector = useSelector(location.pathname.includes("feed") && orders)

    const order = location.state?.order || orders.find(order => order._id === id)

   
  

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