import { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredients from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => {
 const ingredients = useSelector(state => state.ingredients);

  const [current, setCurrent] = useState("bun");
  const buns = ingredients.items.filter((item) => (item.type === "bun" ? item : null));
  const sauces = ingredients.items.filter((item) =>
    item.type === "sauce" ? item : null
  );
  const mains = ingredients.items.filter((item) =>
    item.type === "main" ? item : null
  );

  const [bunRef, inViewBun] = useInView({
    threshold: 0,
});
const [sauseRef, inViewSause] = useInView({
    threshold: 0,
});
const [mainRef, inViewMain] = useInView({
    threshold: 0,
});

useEffect(() => {
    if (inViewBun) {
        setCurrent('bun');
    } else if (inViewSause) {
        setCurrent('sauce');
    } else if (inViewMain) {
        setCurrent('main');
    }
}, [inViewBun, inViewMain, inViewSause]);

  const onClickTab = (tab) => {
    setCurrent(tab);
    const item = document.getElementById(tab);
    if (item) {
      return item.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <li key={1} ref={bunRef}>
          <h2 className="text text_type_main-medium" id="bun">
            Булки
          </h2>
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
        <li key={2} ref={sauseRef}>
          <h2 className="text text_type_main-medium" id="sauce">
            Соусы
          </h2>
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
        <li key={3} ref={mainRef}>
          <h2 className="text text_type_main-medium" id="main">
            Начинки
          </h2>
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

export default BurgerIngredients;
