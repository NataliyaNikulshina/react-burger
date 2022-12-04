import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import app from "./app.module.css";
import { useEffect, useState } from 'react';
import { dataIngredients } from "../../utils/data.js";

function App() {
  const [data, setData] = useState({
    hasError: false,
    isLoading: false,
    dataIngredients: []
  });

  useEffect(() => {
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    const getProductData = async () => {
      setData({...data, isLoading: true}); 
      fetch(url,{method: "GET"})
      .then((res) => res.json())
      .then((dataIngredients) => setData({ ...data, dataIngredients, isLoading: false }))
      .catch((e) => {
        setData({ ...data, hasError: true, isLoading: false });
      });
    };

    getProductData();

  }, []);

  const { dataIngredients, isLoading, hasError } = data;
  return (
    <div className="App">
      <AppHeader />
      <main className={app.main}>
      {dataIngredients.data && <BurgerIngredients data={dataIngredients.data} />}
      {dataIngredients.data && <BurgerConstructor data={dataIngredients.data} />}
      </main>
    </div>
  );
}

export default App;
