import React from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import burgerIngredient from "./ingredient.module.css";

const Ingredient = ({ingredient}) => {
  const [count, setCount] = React.useState(0);
  const [visibility, changeVisibility] = React.useState(false);

  function toggleVisibility(e) {
    e.stopPropagation();
    changeVisibility((prevValue) => !prevValue);
  }

  return (
    <div className={`${burgerIngredient.item} `} onClick={toggleVisibility}>
      {count > 0 && (<Counter count={count} size="default" />)}
      <img src={ingredient.image} alt={ingredient.name}></img>
      <div className={`${burgerIngredient.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-2">
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-6">
        {ingredient.name}
      </p>
      {visibility && (
        <Modal setClose={toggleVisibility} title={"Детали ингредиента"}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default Ingredient;
