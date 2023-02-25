import { useLocation } from "react-router-dom";
import styleFeed from "./feed.module.css";

import OrderFeelCard from "../components/order-feel-card/order-feel-card";

const OrdersInfo = () => {
  return (
    <div className={`${styleFeed.wrapper}`}>
      <div className={`${styleFeed.containerList} mr-9`}>
        <p className={"text text_type_main-medium text_color_primary mb-6"}>
          Готовы:
        </p>
        <ul className={styleFeed.listNumer}>
          <li className={"text text_type_digits-default text_color_success"}>
            123455
          </li>
          <li className={"text text_type_digits-default text_color_success"}>
            123455
          </li>
          <li className={"text text_type_digits-default text_color_success"}>
            123455
          </li>
        </ul>
      </div>
      <div className={styleFeed.containerList}>
        <p className={"text text_type_main-medium text_color_primary mb-6"}>
          В работе:
        </p>
        <ul className={`${styleFeed.listNumer}`}>
          <li className={"text text_type_digits-default text_color_primary"}>
            4534
          </li>
          <li className={"text text_type_digits-default text_color_primary"}>
            4534
          </li>
          <li className={"text text_type_digits-default text_color_primary"}>
            4534
          </li>
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

  return (
    <div className={`${styleFeed.container}`}>
       <h2 className={"text text_type_main-large text_color_primary mt-10 mb-5"}> Лента заказов </h2>
       <div className={styleFeed.wrapper}>
          <div className={`${styleFeed.items} pr-4`}>
            <OrderFeelCard />
          </div>
        <div className={`${styleFeed.ordersInfo} ml-15 pr-4`}>
            <OrdersInfo />
            <OrdersStatistics title={"Выполнено за все время:"} number={1234}/>
            <OrdersStatistics title={"Выполнено за сегодня:"} number={134768564}/>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
