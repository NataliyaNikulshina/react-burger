import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import app from "./app.module.css";
import { dataIngredients } from "../../utils/data.js";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={app.main}>
        <BurgerIngredients data={dataIngredients} />
        <BurgerConstructor data={dataIngredients} />
      </main>
    </div>
  );
}

export default App;
