import { FC } from 'react';
import ingredientDetails from "./ingredient-details.module.css";
import { useSelector } from "../../services/hooks";
import { IIngredient, IIngDetailsInitial } from "../../services/types/data";

const IngredientDetails: FC = () => {
  // const { ingredient } = props;
  const ingredient = useSelector((state) => state.details);
console.log(ingredient)
  return (
    <div className={ingredientDetails.container}>
      <div className={ingredientDetails.main}>
        <div className={`${ingredientDetails.image} mb-4`}>
          <img src={ingredient.ingredientDetailsInfo?.image_large} alt={ingredient.ingredientDetailsInfo?.name} />
        </div>
        <h2
          className={`${ingredientDetails.name} text text_type_main-medium mb-8`}
        >
          {ingredient.ingredientDetailsInfo?.name}
        </h2>
        <div>
          <ul
            className={`${ingredientDetails.list} text text_type_main-default text_color_inactive`}
          >
            <li className={`${ingredientDetails.item}`}>
              <p className={ingredientDetails.paragraph}>Калории,ккал</p>
              <p
                className={`${ingredientDetails.paragraph} text_type_digits-default pt-2`}
              >
                {ingredient.ingredientDetailsInfo?.carbohydrates}
              </p>
            </li>
            <li className={`${ingredientDetails.item}`}>
              <p className={ingredientDetails.paragraph}>Белки, г</p>
              <p
                className={`${ingredientDetails.paragraph} text_type_digits-default pt-2`}
              >
                {ingredient.ingredientDetailsInfo?.proteins}
              </p>
            </li>
            <li className={`${ingredientDetails.item}`}>
              <p className={ingredientDetails.paragraph}>Жиры, г</p>
              <p
                className={`${ingredientDetails.paragraph} text_type_digits-default pt-2`}
              >
                {ingredient.ingredientDetailsInfo?.fat}
              </p>
            </li>
            <li className={`${ingredientDetails.item}`}>
              <p className={ingredientDetails.paragraph}>Углеводы, г</p>
              <p
                className={`${ingredientDetails.paragraph} text_type_digits-default pt-2`}
              >
                {ingredient.ingredientDetailsInfo?.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
