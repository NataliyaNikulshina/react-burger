import React from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {
    CurrencyIcon,
    Counter
  } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import burgerIngredient from "./ingredient.module.css";

function PriceIngredient( {price} ) {
    return (
      <div className={`${burgerIngredient.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
    );
  }
  
  const Ingredient = (props) => {
    const [count, setCount] = React.useState(0);
    const [visibility, changeVisibility] = React.useState(false);
  
    function toggleVisibility(e) {
      e.stopPropagation();
      console.log(visibility);
      changeVisibility((prevValue) => !prevValue);
      console.log(visibility);
    }
  
    return (
      <div
        className={`${burgerIngredient.item} `}
        onClick={toggleVisibility}
      >
        <Counter count={count} size="default" />
        <img src={props.ingredient.image} alt={props.ingredient.name}></img>
        <PriceIngredient price={props.ingredient.price} />
        <p className="text text_type_main-default mb-6">
          {props.ingredient.name}
        </p>
        {visibility && (
          <Modal setClose={toggleVisibility} title={"Детали ингредиента"}>
            <IngredientDetails ingredient={props.ingredient} />
          </Modal>
        )}
      </div>
    );
  };

  Ingredient.propTypes = {
    ingredient: ingredientType.isRequired,
  };

  export default Ingredient;