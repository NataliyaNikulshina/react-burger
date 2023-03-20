import { FC } from "react";
import orderDetails from "./order-details.module.css";
import orderDetailsImage from "../../images/done.png";
import propTypes from "prop-types";
import Loader from "../loader/loader";

interface IOrderDetailsProps {
  orderNumber: number;
  isLoading: boolean;
}

const OrderDetails: FC<IOrderDetailsProps> = ({ orderNumber, isLoading }) => {
 // console.log(orderNumber, isLoading);
  return (
    <div className={orderDetails.container}>
      {isLoading ? 
      <Loader />
      : 
      <p className="text text_type_digits-large mt-4 mb-8">{orderNumber}</p>}
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img
        className={`${orderDetails.image}`}
        src={orderDetailsImage}
        alt="Done"
      ></img>
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

// OrderDetails.propTypes = {
//   orderNumber: propTypes.number.isRequired,
// };

export default OrderDetails;
