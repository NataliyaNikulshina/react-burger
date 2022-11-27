import AppHeader from './components/app-header/app-header.js';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.js';
import BurgerConstructor from './components/burger-constructor/burger-constructor.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className='main'>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
