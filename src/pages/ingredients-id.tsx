import IngredientDetails from "../components/ingredient-details/ingredient-details";
import HomePage from "./home";
import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "../services/hooks";
import { useParams, useLocation } from "react-router-dom";
import { setIngredientDetails } from "../services/actions/ingredient-details";
import styleIngDetails from '../components/ingredient-details/ingredient-details.module.css';
import { IIngDetailsInitial, IIngredient } from "../services/types/data";


const IngredientDetailsPage: FC = () => {
  //const [ingredient, setIngredient] = useState(null);
 // const isLoading = useSelector((state) => state.ingredients.itemsRequest);
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  console.log(id);
  const ingredients = useSelector((state) => state.ingredients);
  const ingredientDetails = useSelector((state) => state.details);
  //console.log(ingredients);

  useEffect(() => {
    if (location.state?.from !== "/") {
          const ingredient = ingredients.items.find((item) => item._id === id);
          //console.log('ditails text', ingredient, ingredients)
        if (ingredient) {dispatch(setIngredientDetails(ingredient));}
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
          <IngredientDetails />
        </div>
      </div>
  );
};

export default IngredientDetailsPage;
