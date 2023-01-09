import React from "react";
import {
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import Modal from "../modal/modal";
import { IngredientsContext } from "../../context/app-context";
import { useSelector, useDispatch } from "react-redux";
import { postOrder } from '../../services/actions/order';

function BurgerFirstItem(props) {
  return (
    <div className={`${burgerConstructor.element} mr-4 mb-4`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${props.ingredient.name} (верх)`}
        price={props.ingredient.price}
        thumbnail={props.ingredient.image}
      />
    </div>
  );
}

BurgerFirstItem.propTypes = {
  ingredient: ingredientType.isRequired,
};

function BurgerMiddleItem(props) {
  return (
    <li className={`${burgerConstructor.item} mr-2 mb-4 ml-4`}>
      <DragIcon type="primary" />
      <div className={`${burgerConstructor.element}`}>
        <ConstructorElement
          type=""
          text={`${props.ingredient.name}`}
          price={props.ingredient.price}
          thumbnail={props.ingredient.image}
        />
      </div>
    </li>
  );
}

BurgerMiddleItem.propTypes = {
  ingredient: ingredientType.isRequired,
};

function BurgerLastItem(props) {
  return (
    <div className={`${burgerConstructor.element} mr-4 mt-4`}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${props.ingredient.name} (низ)`}
        price={props.ingredient.price}
        thumbnail={props.ingredient.image}
      />
    </div>
  );
}

BurgerLastItem.propTypes = {
  ingredient: ingredientType.isRequired,
};

const BurgerConstructor = () => {
  const ingredients = useSelector((state) => state.ingredients);
  //console.log(ingredients);
  const dispatch = useDispatch();
  const orderNumber = useSelector((state) => state.order);
  //console.log(orderNumber);

  const bun = ingredients.items.find(function (el) {
    return el.type === "bun";
  });

  const ingredientsArray = React.useMemo(() => ingredients.items.filter((el) => el.type !== "bun"), [ingredients.items]);

  const calculationPrice = React.useMemo(() => {
    const sum = ingredientsArray.reduce((prev, el) => prev + el.price, 0);
    const total = sum + bun.price * 2;
    return total;
  }, [ingredients.items]);

  const [visibility, changeVisibility] = React.useState(false);

  function openModal(e) {
    e.stopPropagation();
    postOrderNumer();
    changeVisibility((prevValue) => !prevValue);
  }

  function closeModal(e) {
    e.stopPropagation();
    changeVisibility((prevValue) => !prevValue);
  }

  const postOrderNumer = () => {
    const arrOrder = ingredientsArray;
    arrOrder.push(bun);
    arrOrder.unshift(bun);
    const dataId = arrOrder.map((item) => item._id);
    console.log("дата айди " + dataId);
    dispatch(postOrder(dataId));
    /*postOrderDetails(dataId)
      .then((dataOrd) => setOrderNumber(dataOrd.order.number))
      .catch((error) => console.error(error));*/
  };

   /*const modalOrderDetails = (
    <Modal setClose={closeModal}>
      <OrderDetails orderNumber={orderNumber.orderNum.order.number} />
    </Modal>
  );*/

  return (
    <section className={`${burgerConstructor.container} mt-15`}>
      <BurgerFirstItem ingredient={bun} />
      <ul className={`${burgerConstructor.list}`}>
        {ingredients.items.map((el) => {
          if (el.type !== "bun") {
            return <BurgerMiddleItem ingredient={el} key={el._id} />;
          }
        })}
      </ul>
      <BurgerLastItem ingredient={bun} />
      <ul className={`${burgerConstructor.result} mt-10`}>
        <p className="text text_type_digits-medium">{calculationPrice}</p>
        <li className={`${burgerConstructor.icon} ml-2 mr-10`}>
          <CurrencyIcon type="primary" />
        </li>
        <li className="mr-4">
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openModal}
          >
            Оформить заказ
          </Button>
        </li>
      </ul>

      {visibility && !(orderNumber.orderNum === '') && 
        <Modal setClose={closeModal}>
          <OrderDetails orderNumber={orderNumber.orderNum.order.number} />
        </Modal>}
    </section>
  );
};

export default BurgerConstructor;
