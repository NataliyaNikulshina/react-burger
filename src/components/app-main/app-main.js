import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styleMain from "./app-main.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetailsFunc from '../ingredient-details/ingredient-details';
import { addIngredientDetails } from '../../services/actions/ingredient-details';
import { useNavigate, useLocation} from "react-router-dom";
import Loader from "../loader/loader.js";

const AppMain = () => {
  const ingredients = useSelector((state) => state.ingredients);
  const isLoading = ingredients.itemsRequest;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const [visibility, changeVisibility] = useState(false);
  // const toggleVisibility = (e) => {
  //   e.stopPropagation();
  //  // dispatch(addIngredientDetails(e));
  //   changeVisibility((prevValue) => !prevValue);
  //   navigate('/');
  // };

  // const ingredientDetails = useSelector((state) => state.details.ingredientDetails);

  //  useEffect(() => {
  //    // e.stopPropagation();
  //     if (location.state?.ingredient) {
  //       dispatch(addIngredientDetails(location.state.ingredient));
  //     //dispatch({type: SET_INGREDIENT, payload: location.state.ingredient})
  //      changeVisibility(true)
  //     }
  //   }, [location.state])


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className={styleMain.main}>
          <DndProvider backend={HTML5Backend}>
            {ingredients.items.length && <BurgerIngredients />}
            {ingredients.items.length && <BurgerConstructor />}
          </DndProvider>
        </main>
      )}
       {/* {visibility && ingredientDetails && (
        <Modal setClose={toggleVisibility} title={"Детали ингредиента"}>
          <IngredientDetailsFunc />
        </Modal>
      )} */}
    </>
  );
};

export default AppMain;
