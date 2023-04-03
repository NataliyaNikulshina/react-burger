import { FunctionComponent } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import burgerIngredient from "./ingredient.module.css";
import { useDrag } from "react-dnd";
import { IIngredient } from "../../services/types/data.js";

interface IIngredientList {
  //type: string;
  ingredient: IIngredient;
  count: number;
}

const Ingredient : FunctionComponent<IIngredientList> = ({ ingredient, count }) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {ingredient: ingredient},
  });

  return (
    <div
      className={`${burgerIngredient.item} `}
      ref={dragRef}
    >
      <Link to={`/ingredients/${ingredient._id}`} replace={true} state={{ingredient: ingredient, from: "/", background: true}} className={`text_color_primary ${burgerIngredient.link}`}>
      {count > 0 && <Counter count={count} size="default" />}
      <img src={ingredient.image} alt={ingredient.name}></img>
      <div className={`${burgerIngredient.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-6">{ingredient.name}</p>
      </Link>
    </div>
  );
};

// Ingredient.propTypes = {
//   ingredient: ingredientType.isRequired,
//   count: propTypes.number,
//   onClick: propTypes.func,
// };

export default Ingredient;
