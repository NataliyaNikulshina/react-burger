import React from "react";
import burgerItem from "./burger-item.module.css";
import {
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types.js";

export const BurgerFirstItem = ({ingredient}) => { 
    return (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredient.name} (верх)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
    );
  }
  
  BurgerFirstItem.propTypes = {
    ingredient: ingredientType.isRequired,
  };
  
  export const BurgerMiddleItem = ({ingredient}) => {
    return (
      <li className={`${burgerItem.item} mr-2 mb-4 ml-4`}>
        <DragIcon type="primary" />
        <div className={`${burgerItem.element}`}>
          <ConstructorElement
            type=""
            text={`${ingredient.name}`}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        </div>
      </li>
    );
  }
  
  BurgerMiddleItem.propTypes = {
    ingredient: ingredientType.isRequired,
  };
  
  export const BurgerLastItem = ({ingredient}) => {
    return (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredient.name} (низ)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
    );
  }
  
  BurgerLastItem.propTypes = {
    ingredient: ingredientType.isRequired,
  };