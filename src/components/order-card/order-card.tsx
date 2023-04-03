import { useMemo, FC } from 'react';
import orderCard from "./order-card.module.css";
import propTypes from "prop-types";
import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";
import {  Link } from "react-router-dom";
import { useIngredientsData } from "../../hooks/useIngredientsData";
import { getDate } from "../../utils/date";
import { getStatus } from "../../utils/status";
import { IOrderInfo } from "../../services/types/data"

interface IOrderCardsProps {
  elementPosition: string;
  order: IOrderInfo;
}

const OrderCard: FC<IOrderCardsProps> = ({elementPosition, order}) => {
  const ingredients = useIngredientsData();
  const price = useMemo(() => order.ingredients.reduce((a,ingredientId) => ingredientId ? a + ingredients.getIngredientPrice(ingredientId) : a,0),[ingredients, order])

  //console.log(elementPosition);
  return (
    <Link
        className={`text_color_primary ${orderCard.link}`}
        to={elementPosition === "feed" ? `/feed/${order._id}` : elementPosition === "profile" ? `/profile/orders/${order._id}` : '*'}
        state={{from: elementPosition, order: order}}
      >
      <div className={orderCard.header}>
        <p className={`text text_type_digits-default`}>#{order.number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>{getDate(order.createdAt)}</p>
      </div>
      <p className={`text text_type_main-medium text_color_primary mt-6`}>{order.name}</p>
      {order.status && elementPosition === "profile" && <p className={order.status === "done" ? "text text_type_main-small mt-2 text_color_success" : order.status === "created" ? "text text_type_main-small mt-2 text_color_primary" :  "text text_type_main-small mt-2 text_color_accent"}>{getStatus(order.status)}</p>}
      <div className={`mt-6 ${orderCard.header}`}>
        <div className={orderCard.ingredientsContainer}>
          {order.ingredients.slice(0,6).map((ingredientId,index) => 
            ingredientId && <div className={orderCard.ingredientImageContainer} data-count={`+${order.ingredients.slice(6).length}`} key={`${order._id}-${index}-${ingredientId}`}>
              <img src={ingredients.getIngredientImage(ingredientId)} className={orderCard.ingredientImage} alt={"Картинка ингредиента"}/></div>)
            }
        </div>
        <div className={`text text_type_main-default ${orderCard.price}`}>
          <p className={"text text_type_digits-default text_color_primary"}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

//  OrderCard.propTypes = {
//    order: propTypes.object.isRequired,
//    elementPosition: propTypes.string.isRequired,
//  };

export default OrderCard;