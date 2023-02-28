import { useLocation, useNavigate, Outlet } from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from 'react';
import styleFeed from "./feed.module.css";
import Modal from "../components/modal/modal";
import OrderCard from "../components/order-card/order-card";
import OrderDetailsInfo from "../components/order-details-info/order-details-info";
import {
    wsConnectionStart,
    wsConnectionClose,
  } from "../services/actions/ws";
import { apiWS } from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader/loader";

const OrdersInfo = ({ doneList, workList }) => {
  return (
    <div className={`${styleFeed.wrapper}`}>
      <div className={`${styleFeed.containerList} mr-9`}>
        <p className={"text text_type_main-medium text_color_primary mb-6"}>
          Готовы:
        </p>
        <ul className={styleFeed.listNumer}>
            {doneList.map((item) => {
                return (
                    <li
                    key={item}
                    className={`text text_type_digits-default text_color_success`}
                    >
                    {item}
                    </li>
                );
                })}
        </ul>
      </div>
      <div className={styleFeed.containerList}>
        <p className={"text text_type_main-medium text_color_primary mb-6"}>
          В работе:
        </p>
        <ul className={styleFeed.listNumer}>
            { workList.map((item) => {
                return (
                    <li
                    key={item}
                    className={`text text_type_digits-default `}
                    >
                    {item}
                    </li>
                );
                })}
        </ul>
      </div>
    </div>
  );
};

const OrdersStatistics = ({title, number}) => {
  return (
    <div>
      <p className={`text text_type_main-medium text_color_primary`}>
        {title}
      </p>
      <p className={`text text_type_digits-large text_color_primary ${styleFeed.shadow}`} >
        {number}
      </p>
    </div>
  );
};

const FeedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {orders, total, totalToday, } = useSelector((store) => store.wsocket);
  const ingredients = useSelector((state) => state.ingredients);


  const [visibility, changeVisibility] = useState(location.state?.from === 'feed')

  // const handleCloseModal = useCallback(() => {
  //   changeVisibility(false)
  //   navigate(-1)
  // },[navigate])

 // console.log(visibility);

  useEffect(() => {
    dispatch(wsConnectionStart(apiWS.urlWS));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, []);
  
  const { doneList, workList } = useMemo(() => {
    if (!orders.length) {
      return { doneList: [], workList: [] };
    }
    return orders.reduce(
      (count, item) => {
        // eslint-disable-next-line default-case
        switch (item.status) {
          case "done":
            count.doneList.push(item.number);
            break;
          case "pending":
            count.workList.push(item.number);
            break;
        }
        return count;
      },
      { doneList: [], workList: [] }
    );
  }, [orders]);

  return (
    ingredients && orders
    ?
    <div className={`${styleFeed.container}`}>
       <h2 className={"text text_type_main-large text_color_primary mt-10 mb-5"}>Лента заказов</h2>
       <div className={styleFeed.wrapper}>
          <div className={`${styleFeed.items} pr-4`}>
            {orders.map(order => <OrderCard elementPosition={"feed"} order={order} key={order._id} />)}
          </div>
         <div className={`${styleFeed.ordersInfo} ml-15 pr-4`}>
            <OrdersInfo doneList={doneList} workList={workList}/>
            <OrdersStatistics title={"Выполнено за все время:"} number={total}/>
            <OrdersStatistics title={"Выполнено за сегодня:"} number={totalToday}/>
        </div> 
      </div>
      {/* {visibility &&
                    <Modal onClose={handleCloseModal}>
                        <div className={"mt-15 mb-15"}>
                            <OrderDetailsInfo order={orders.find(order => order._id === location.state.order._id)} />
                            {/* <OrderInfo orderInfo={orders.find(order => order._id === location.state.order._id)}/>  
                        </div>
                    </Modal>
                } */}
                <Outlet/>
    </div>
     :
     <Loader/>
  );
};

export default FeedPage;
