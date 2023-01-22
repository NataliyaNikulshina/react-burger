import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import burgerIngredient from "./ingredient.module.css";
import { useDrag } from "react-dnd";

const Ingredient = ({ ingredient, count, onClick }) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <div
      className={`${burgerIngredient.item} `}
      onClick={() => onClick(ingredient)}
      ref={dragRef}
    >
      {count > 0 && <Counter count={count} size="default" />}
      <img src={ingredient.image} alt={ingredient.name}></img>
      <div className={`${burgerIngredient.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-6">{ingredient.name}</p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
  count: propTypes.number,
  onClick: propTypes.func,
};

export default Ingredient;
