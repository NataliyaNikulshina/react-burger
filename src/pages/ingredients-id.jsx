import ingredientDetails from "../components/ingredient-details/ingredient-details.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import AppHeader from "../components/app-header/app-header";
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import getItems from '../services/actions/ingredients';

const IngredientDetailsPage = () => {
 // const [ingredient, setIngredient] = useState(null);
 const ingredients = useSelector((state) => state.ingredients);
  const { id } = useParams();
  const ingDetails = {};
  
  useEffect(() => {
     ingDetails = ingredients.items.filter(ing => ing._id === id)  
},[id])


  return (
    <>
      <AppHeader />
      <div className={ingredientDetails.container}>
        <IngredientDetails
          ingredientDetails={ingDetails}
          textAlignCentre={true}
        />
      </div>
    </>
  );
};

export default IngredientDetailsPage;
