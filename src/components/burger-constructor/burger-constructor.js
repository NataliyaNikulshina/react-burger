import React from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import Modal from "../modal/modal";
import {
  IngredientsContext,
  TotalPriceContext,
} from "../../context/app-context";
import { TotalPrice } from "../total-price/total-price";

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
  const { data } = React.useContext(IngredientsContext);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const bun = data.data.find(function (el) {
    return el.type === "bun";
  });

  const [visibility, changeVisibility] = React.useState(false);

  function toggleVisibility(e) {
    e.stopPropagation();
    console.log(visibility);
    changeVisibility((prevValue) => !prevValue);
    console.log(visibility);
  }

  const modalOrderDetails = (
    <Modal setClose={toggleVisibility}>
      <OrderDetails />
    </Modal>
  );

  const calculateTotalPrice = () => {
    let total = bun.price * 2;
   // console.log(total);
    {data.data.map((el) => {
      if (el.type !== "bun") {
        total += el.price;
    //    console.log(total);
      }
    })}
    return total;
  };

  return (
    <section className={`${burgerConstructor.container} mt-15`}>
      <BurgerFirstItem ingredient={bun} />
      <ul className={`${burgerConstructor.list}`}>
        {data.data.map((el) => {
          if (el.type !== "bun") {
            return <BurgerMiddleItem ingredient={el} key={el._id} />;
          }
        })}
      </ul>
      <BurgerLastItem ingredient={bun} />
      <ul className={`${burgerConstructor.result} mt-10`}>
        <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
          <TotalPrice>{calculateTotalPrice()}</TotalPrice>
        </TotalPriceContext.Provider>
        <li className="mr-4">
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={toggleVisibility}
          >
            Оформить заказ
          </Button>
        </li>
      </ul>

      {visibility && modalOrderDetails}
    </section>
  );
};

/*BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};*/

export default BurgerConstructor;
