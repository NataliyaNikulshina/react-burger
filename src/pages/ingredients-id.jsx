import ingredientDetails from "../components/ingredient-details/ingredient-details.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import HomePage from "../pages/home";
import AppHeader from "../components/app-header/app-header";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getProductData } from "../utils/api";
import { SET_INGREDIENT_DETAILS } from "../services/actions/ingredient-details";
import  IngredientDetailsFunc  from "../components/ingredient-details/ingredient-details";
import styleIngDetails from '../components/ingredient-details/ingredient-details.module.css';


const IngredientDetailsPage = () => {
  //const [ingredient, setIngredient] = useState(null);
 // const isLoading = useSelector((state) => state.ingredients.itemsRequest);
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients);
  const ingredientDetails = useSelector((state) => state.details.ingredientDetails);
  //console.log(ingredients);

  useEffect(() => {
    if (location.state?.from !== "/") {
          const ingredient = ingredients.items.find((item) => item._id === id);
          //console.log('ditails text', ingredient, ingredients)
          dispatch({ type: SET_INGREDIENT_DETAILS, payload: ingredient });
    }
  }, [ingredients]);

  return location.state?.from === "/" ? (
    <HomePage />
  ) : (
    ingredientDetails && 
      <div className={`${styleIngDetails.container} mt-30`}>
        <div className={styleIngDetails.main}>
          <h1 className={`text text_type_main-large pt-2`}>
            Детали ингредиента
          </h1> 
          <IngredientDetailsFunc textAlignCentre={true} />
        </div>
      </div>
  );
};

export default IngredientDetailsPage;
