import orderCard from "./order-feel-card.module.css";
import propTypes from "prop-types";
import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";


const OrderFeelCard = () => {
  return (
    <div className={orderCard.wrapper}>
      <div className={orderCard.header}>
        <p className={`text text_type_digits-default`}>#</p>
        <p className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date()} /></p>
      </div>
      <p className={`text text_type_main-medium text_color_primary mt-6`}>Name</p>
      <p className={`text text_type_main-default ${orderCard.status}`}>Status</p>
      <div className={orderCard.price}>
         <p className={"text text_type_digits-default text_color_primary"}>123</p>
         <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

// OrderDetails.propTypes = {
//   orderNumber: propTypes.number.isRequired,
// };

export default OrderFeelCard;