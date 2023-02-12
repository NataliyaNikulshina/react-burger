import ingredientDetails from "../components/ingredient-details/ingredient-details.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import AppHeader from "../components/app-header/app-header";
import React from "react";

const IngredientDetailsPage = () => {
  const [ingredient, setIngredient] = React.useState(null);

  return (
    <>
      <AppHeader />
      <div className={ingredientDetails.container}>
        <IngredientDetails
          ingredientDetails={ingredient}
          textAlignCentre={true}
        />
      </div>
    </>
  );
};

export default IngredientDetailsPage;
