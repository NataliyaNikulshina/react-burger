import React from 'react';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number
});

function PriceIngredient(props) {
  return (
    <div className={`${burgerIngredients.price} mt-1 mb-1`}>
      <p className="text text_type_digits-default mr-2">{props.price}</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}


function Ingredient (props) {
  return (
    <div className={`${burgerIngredients.item} `}>
      <Counter count={1} size="default" />
      <img src={props.ingredient.image} alt={props.ingredient.name}></img>
      <PriceIngredient price={props.ingredient.price} />
      <p className="text text_type_main-default mb-6">{props.ingredient.name}</p>
    </div>
  );
}  

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired
}; 

function BurgerIngredients (props) {
      const [current, setCurrent] = React.useState('bun')
      return (
        <section className={`${burgerIngredients.container} mr-10`}>
                <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>     
        <nav className={`${burgerIngredients.nav}`}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </nav>
        <ul className={` ${burgerIngredients.list} mt-10`}>
        <li key={1}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={`${burgerIngredients.ingredient_list} mb-10 mt-6 ml-4`}>
            {props.data.map((el) => { 
              if (el.type === "bun") {
                return (<Ingredient ingredient={el}  key={el._id} />);
              }
            })}
          </div>
        </li>
        <li key={2}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${burgerIngredients.ingredient_list} mb-10 mt-6 ml-4`}>
            {props.data.map((el) => { 
              if (el.type === "sauce") {
                return (<Ingredient ingredient={el}  key={el._id} />);
              }
            })}
          </div>
        </li>
        <li key={3}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${burgerIngredients.ingredient_list} mb-10 mt-6 ml-4`}>
            {props.data.map((el) => { 
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


BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType)
}

export default BurgerIngredients;