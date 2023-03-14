import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styleMain from "./app-main.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom";
import Loader from "../loader/loader.js";

const AppMain = () => {
  const ingredients = useSelector((state) => state.ingredients);
  const isLoading = ingredients.itemsRequest;

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
    </>
  );
};

export default AppMain;
