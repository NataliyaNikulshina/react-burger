import React from "react";
import {
  CurrencyIcon,
  Counter,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types.js";
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from "../modal/modal";

function PriceIngredient(props) {
  return (
    <div className={`${burgerIngredients.price} mt-1 mb-1`}>
      <p className="text text_type_digits-default mr-2">{props.price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
}

function Ingredient(props) {
  const [count, setCount] = React.useState(0);
  const [visibility, changeVisibility] = React.useState(false)
  const [ingredient, setIngredient] = React.useState(null)

const modalIngredientDetails = (
    <Modal changeVisibility={changeVisibility} title={"Детали ингредиента"}>
    <IngredientDetails ingredient={ingredient} />
  </Modal> )

  return (
    <div className={`${burgerIngredients.item} `} onClick={() => {
      changeVisibility(true)
      setIngredient({...props.ingredient})
  }}>
      <Counter count={count} size="default" onClick={setCount} />
      <img src={props.ingredient.image} alt={props.ingredient.name}></img>
      <PriceIngredient price={props.ingredient.price} />
      <p className="text text_type_main-default mb-6">
        {props.ingredient.name}
      </p>  
      {visibility && modalIngredientDetails}
    </div>
    
  );
}

const BurgerIngredients = (props) => {
  console.log(props.data);
  const [current, setCurrent] = React.useState("bun");
  const buns = props.data.filter(item => item.type === 'bun' ? item : null)
  const sauces = props.data.filter(item => item.type === 'sauce' ? item : null)
  const mains = props.data.filter(item => item.type === 'main' ? item : null)

  const onClickTab = (tab) => {
    setCurrent(tab);
    const item = document.getElementById(tab);
    console.log(item);
    if (item) {
      return item.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className={`${burgerIngredients.container} mr-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <nav className={`${burgerIngredients.nav}`}>
        <Tab value="bun" active={current === "bun"} onClick={onClickTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={onClickTab}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={onClickTab}>
          Начинки
        </Tab>
      </nav>
      <ul className={` ${burgerIngredients.list} mt-10`}>
        <li key={1}>
          <h2 className="text text_type_main-medium" id="bun">Булки</h2>
          <div
            className={`${burgerIngredients.ingredient_list} mb-10 mt-6 ml-4`}
          >
            {buns.map((el) => {
              if (el.type === "bun") {
                return <Ingredient ingredient={el} key={el._id} />;
              }
            })}
          </div>
        </li>
        <li key={2}>
          <h2 className="text text_type_main-medium" id="sauce">Соусы</h2>
          <div
            className={`${burgerIngredients.ingredient_list} mb-10 mt-6 ml-4`}
          >
            {sauces.map((el) => {
              if (el.type === "sauce") {
                return <Ingredient ingredient={el} key={el._id} />;
              }
            })}
          </div>
        </li>
        <li key={3}>
          <h2 className="text text_type_main-medium" id="main">Начинки</h2>
          <div
            className={`${burgerIngredients.ingredient_list} mb-10 mt-6 ml-4`}
          >
            {mains.map((el) => {
              if (el.type === "main") {
                return <Ingredient ingredient={el} key={el._id} />;
              }
            })}
          </div>
        </li>
      </ul>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default BurgerIngredients;
