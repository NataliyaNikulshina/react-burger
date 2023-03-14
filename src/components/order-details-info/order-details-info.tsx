import React, { useEffect, useMemo, FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./order-details-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getStatus } from "../../utils/status";
import { getDate } from "../../utils/date";
import { useIngredientsData } from "../../hooks/useIngredientsData";
import Loader from "../loader/loader";
import { useIngredientsCountData } from "../../hooks/useIngredientsCountData";
import { IIngredient, IOrderInfo } from "../../services/types/data.js";

interface IOrderDetailsItemProps {
  ingredient: IIngredient;
  count: number;
}

const OrderDetailsItem: FC<IOrderDetailsItemProps> = ({ingredient,count}) => {
 // console.log(ingredient, count)
  return (
      <div className={styles.containerItem}>
        <div className={styles.wrapperItem}>
            <div className={styles.imageContainerItem}>
                <img src={ingredient.image} alt="Картинка ингредиента" className={styles.imageItem}/>
            </div>
            <p className={`${styles.titleItem} text text_type_main-small text_color_primary ml-4`}>{ingredient.name}</p>
          </div>
          <div className={styles.wrapperItem}>
            <p className={'text text_type_digits-default text_color_primary ml-4 mr-2'}>{count} x {ingredient.price}</p>
            <CurrencyIcon type="primary" />
          </div>
      </div>
  );
};

//  OrderDetailsItem.propTypes = {
//    ingredient: ingredientType.isRequired,
//    count: propTypes.number.isRequired
//  }

interface IOrderDetailsInfoProps {
  order: IOrderInfo;
}

const OrderDetailsInfo: FC<IOrderDetailsInfoProps> = ({ order }) => {
  const location = useLocation();
  console.log(order);
  const ingredients = useIngredientsData();
  const price = useMemo<number>(
    () =>
      order.ingredients.reduce(
        (prev, ingredientId) =>
          prev + ingredients.getIngredientPrice(ingredientId),
        0
      ),
    [ingredients, order]
  );
  const orderIngredients = useMemo<IIngredient[]>(() => order.ingredients.map(ingredientId => ingredients.getIngredientData(ingredientId)),[order]);
  const {getIngredientCount} = useIngredientsCountData(orderIngredients)
  console.log(getIngredientCount)

  return order ? (
    <div className={`${styles.container}`}>
      <p
        className={`text text_type_digits-default text_color_primary ${styles.id}`}
      >{`#${order.number}`}</p>
      <p
        className={`text text_type_main-medium text_color_primary mt-10 ${styles.title}`}
      >{`${order.name}`}</p>
      <p
        className={
          order.status === "done"
            ? "text text_type_main-small mt-3 text_color_success"
            : order.status === "created"
            ? "text text_type_main-small mt-3 text_color_primary"
            : "text text_type_main-small mt-3 text_color_accent"
        }
      >
        {getStatus(order.status)}
      </p>
      <p className={"text text_type_main-medium text_color_primary mt-15  mb-6 "}>
        Состав:
      </p>
      <div className={`${styles.ingredientsContainer} pr-4`}>
        {[...new Set(orderIngredients)].map(ingredient => <OrderDetailsItem key={ingredient._id} ingredient={ingredient} count={getIngredientCount(ingredient._id)}/>)}
      </div>
      <div className={`${styles.infoContainer} mt-10`}>
        <p className={"text text_type_main-small text_color_inactive"}>
          {getDate(order.createdAt)}
        </p>
        <div className={styles.price}>
          <p className={"text text_type_digits-default text_color_primary"}>
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

//  OrderDetailsInfo.propTypes = {
//      orders: orderInfoType.isRequired
//  }

export default OrderDetailsInfo;
