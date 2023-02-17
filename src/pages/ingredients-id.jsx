import ingredientDetails from "../components/ingredient-details/ingredient-details.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import HomePage from "../pages/home";
import AppHeader from "../components/app-header/app-header";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getProductData } from "../utils/api";
import { SET_INGREDIENT_DETAILS } from '../services/actions/ingredient-details';

const IngredientDetailsPage = () => {
  //const [ingredient, setIngredient] = useState(null);
  const dispatch = useDispatch()
  const location = useLocation();
  const ingredients = useSelector((state) => state.details.ingredientDetails);
  const { id } = useParams();
  console.log(ingredients)

  useEffect(() => {
    if (location.state?.from !== "/") {
      getProductData()
        .then((ingredients) => {
          console.log(ingredients);
          console.log(id);
          const ingredient = ingredients.data.filter(
            (ingredient) => ingredient._id === id
          )[0];
          console.log(ingredient);
          dispatch({type: SET_INGREDIENT_DETAILS, payload: ingredient})
          //setIngredient(ingredient);
        })
        .catch((err) => console.log(err));
    }
  }, [id, location.state]);

  return (
    <>
      <AppHeader />
      {location.state?.from === "/" ? (
        <HomePage />
      ) : (
        <div className={`${ingredientDetails.container} mt-30`}>
        <div className={ingredientDetails.main}>
        <h1
        className={`text text_type_main-large pt-2`}>Детали
        ингредиента</h1>
          <IngredientDetails
            textAlignCentre={true}
          />
        </div>
        </div>
      )}
    </>
  );
};

export default IngredientDetailsPage;
