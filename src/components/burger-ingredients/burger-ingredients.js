import React from 'react';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './burger-ingredients.module.css';
import {dataIngredients} from '../../utils/data.js';

function PriceIngredient(props) {
  return (
    <div className={`${burgerIngredients.price} mt-1 mb-1`}>
      <p className="text text_type_digits-default mr-2">{props.price}</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}

function Ingredient ({ingredient}) {
  return (
    <div className={`${burgerIngredients.item} `}>
      <Counter count={1} size="default" />
      <img src={ingredient.image} alt={ingredient.name}></img>
      <PriceIngredient price={ingredient.price} />
      <p className="text text_type_main-default mb-6">{ingredient.name}</p>
    </div>
  );
}  



class BurgerIngredients extends React.Component {
    render() {
      return (
        <section className={`${burgerIngredients.container} mr-10`}>
                <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>     
        <nav className={`${burgerIngredients.nav}`}>
          <Tab value="bun">
            Булки
          </Tab>
          <Tab value="sauce">
            Соусы
          </Tab>
          <Tab value="main">
            Начинки
          </Tab>
        </nav>
        <ul className={` ${burgerIngredients.list} mt-10`}>
        <li key={1}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={`${burgerIngredients.ingredient_list} mb-10 mt-6 ml-4`}>
            {dataIngredients.map((el) => { 
              if (el.type === "bun") {
                return (<Ingredient ingredient={el}  key={el._id} />);
              }
            })}
          </div>
        </li>
        <li key={2}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${burgerIngredients.ingredient_list} mb-10 mt-6 ml-4`}>
            {dataIngredients.map((el) => { 
              if (el.type === "sauce") {
                return (<Ingredient ingredient={el}  key={el._id} />);
              }
            })}
          </div>
        </li>
        <li key={3}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${burgerIngredients.ingredient_list} mb-10 mt-6 ml-4`}>
            {dataIngredients.map((el) => { 
              if (el.type === "main") {
                return (<Ingredient ingredient={el}  key={el._id} />);
              }
            })}
          </div>
        </li>
      </ul>
        </section>
        
 );
}
}

export default BurgerIngredients;