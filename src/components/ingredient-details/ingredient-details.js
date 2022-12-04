import ingredientDetails from "./ingredient-details.module.css";

const IngredientDetails = (props) => {
  const { ingredient } = props;

  return (
    <div className={ingredientDetails.container}>
      <div className={ingredientDetails.main}>
        <div className={`${ingredientDetails.image} mb-4`}>
          <img src={ingredient.image_large} alt={ingredient.name} />
        </div>
        <h2
          className={`${ingredientDetails.name} text text_type_main-medium mb-8`}
        >
          {ingredient.name}
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
                {ingredient.calories}
              </p>
            </li>
            <li className={`${ingredientDetails.item}`}>
              <p className={ingredientDetails.paragraph}>Белки, г</p>
              <p
                className={`${ingredientDetails.paragraph} text_type_digits-default pt-2`}
              >
                {ingredient.proteins}
              </p>
            </li>
            <li className={`${ingredientDetails.item}`}>
              <p className={ingredientDetails.paragraph}>Жиры, г</p>
              <p
                className={`${ingredientDetails.paragraph} text_type_digits-default pt-2`}
              >
                {ingredient.fat}
              </p>
            </li>
            <li className={`${ingredientDetails.item}`}>
              <p className={ingredientDetails.paragraph}>Углеводы, г</p>
              <p
                className={`${ingredientDetails.paragraph} text_type_digits-default pt-2`}
              >
                {ingredient.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
