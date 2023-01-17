import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import app from "./app.module.css";
import { useEffect, useState } from "react";
import { IngredientsContext } from "../../context/app-context.js";
import { getProductData } from '../../utils/api.js';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getItems } from '../../services/actions/ingredients';

export function App() {
  //const [data, setData] = useState(null);
 // const [loading, setLoading] = useState(true);

 
/*  useEffect(() => {
    getProductData()
    .then(setData)
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
}, [])*/
const ingredients = useSelector(state => state.ingredients);
const dispatch = useDispatch();
useEffect(() => {
 dispatch(getItems())
}, [])


  return (
    <div className="App">
      <AppHeader />
        <main className={app.main}>
           <DndProvider backend={HTML5Backend} > 
           {ingredients.items.length && <BurgerIngredients /> }
           {ingredients.items.length && <BurgerConstructor /> } 
           </DndProvider> 
        </main>
    </div>
  );
}

export default App;
