import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../components/burger-constructor/burger-constructor.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import home from "./home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../services/actions/ingredients';

const HomePage = () => {
  const ingredients = useSelector((state) => state.ingredients);
  const isLoading = ingredients.itemsRequest;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <>
      <div className="App">
        <AppHeader />
        {isLoading && <div className={home.loader} id="loader"></div>}
        {!isLoading && (
          <main className={home.main}>
            <DndProvider backend={HTML5Backend}>
              {ingredients.items.length && <BurgerIngredients />}
              {ingredients.items.length && <BurgerConstructor />}
            </DndProvider>
          </main>
        )}
      </div>
    </>
  );
};

export default HomePage;
