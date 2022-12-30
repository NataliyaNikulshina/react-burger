import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import app from "./app.module.css";
import { useEffect, useState } from "react";
import { IngredientsContext } from "../../context/app-context.js";
import { getProductData } from '../../utils/api.js';

export function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductData()
    .then(setData)
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
}, [])


  return (
    <div className="App">
      <AppHeader />
      <IngredientsContext.Provider value={{data}}>
        <main className={app.main}>
          { data && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </main>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
