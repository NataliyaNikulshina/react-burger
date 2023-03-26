import React, { FC, useEffect } from "react";
import LoginForm from "../components/form/login-form";
import Loader from "../components/loader/loader";
import { useSelector, useDispatch } from "../services/hooks";
import OrderDetailsInfo from "../components/order-details-info/order-details-info";
import { useLocation, useParams } from "react-router-dom";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../services/actions/feed-ws";
import {
  wsConnectionStart as wsConnectionStartUser,
  wsConnectionClose as wsConnectionCloseUser,
} from "../services/actions/user-ws";
import { apiWS } from "../utils/api";
import { getToken } from "../hooks/useTokens";


const OrderDetailsPage: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const ordersUser = useSelector((store) => store.wsocketUser.orders);
  const ordersFeed = useSelector((store) => store.wsocketFeed.orders);
  const orderUser = ordersUser.find((order) => order._id === id);
  const orderFeed = ordersFeed.find((order) => order._id === id);

  useEffect(() => {
    if (location.pathname.includes("profile")) {
      dispatch(
        wsConnectionStartUser(
          apiWS.urlProfile(getToken()!.replace("Bearer ", ""))
        )
      );
      return () => {
        dispatch(wsConnectionCloseUser());
      };
    } else {
      dispatch(wsConnectionStart(apiWS.urlWS));
      return () => {
        dispatch(wsConnectionClose());
      };
    }
  }, []);

  return orderUser || orderFeed ? (
    <div style={{ paddingTop: 122 }}>
      { location.pathname.includes("profile") ?
        <OrderDetailsInfo order={orderUser!} /> :
        <OrderDetailsInfo order={orderFeed!} />
      }
    </div>
  ) : (
    <Loader />
  );
};

export default OrderDetailsPage;
