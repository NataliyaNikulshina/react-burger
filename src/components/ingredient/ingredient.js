import React from "react";
import IngredientDetailsFunc from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import burgerIngredient from "./ingredient.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { addIngredientDetails } from '../../services/actions/ingredient-details';
import {useDrag} from "react-dnd";

const Ingredient = ({ingredient}) => {
  const [count, setCount] = React.useState(0);
  const [visibility, changeVisibility] = React.useState(false);
  const dispatch = useDispatch();

  function toggleVisibility(e) {
    e.stopPropagation();
    dispatch(addIngredientDetails(ingredient));
    changeVisibility((prevValue) => !prevValue);
  }

  const [,dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
})

  return (
    <div className={`${burgerIngredient.item} `} onClick={toggleVisibility} ref={dragRef}>
      {count !== 0 && (<Counter count={count} size="default" />)}
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
          <IngredientDetailsFunc />
        </Modal>
      )}
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default Ingredient;
