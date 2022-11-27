import React from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './burger-constructor.module.css';
import {dataIngredients} from '../../utils/data.js';

function BurgerFirstItem ({ingredient}){
  return (
    <li className={`${burgerConstructor.item} mr-4 mb-4 ml-4`}>
      <li className={`${burgerConstructor.element} ml-8`}>
      <ConstructorElement
        type='top'
        isLocked={true}
        text={`${ingredient.name} (верх)`} 
        price={ingredient.price}
        thumbnail={ingredient.image}
        />
       </li>
    </li>
  )
}

function BurgerMiddleItem ({ingredient}){
  return (
    <li className={`${burgerConstructor.item} mr-4 mb-4 ml-4`}>
      <DragIcon type="primary"/>
      <li className={`${burgerConstructor.element}`}>
        <ConstructorElement 
          type=''
          text={`${ingredient.name}`} 
          price={ingredient.price}
          thumbnail={ingredient.image}
          />
      </li>
    </li>
  )
}

function BurgerLastItem ({ingredient}){
  return (
    <li className={`${burgerConstructor.item} mr-4 mb-4 ml-4`}>
      <li className={`${burgerConstructor.element} ml-8`}>
        <ConstructorElement
        type='bottom'
        isLocked={true}
        text={`${ingredient.name} (низ)`} 
        price={ingredient.price}
        thumbnail={ingredient.image}
        />
      </li>
    </li>
  )
}

class BurgerConstructor extends React.Component {
    render(
     
    ) {
      return (
        <section className={`${burgerConstructor.container} mt-15 mb-1`}>
        <ul className={`${burgerConstructor.list}`}>
          {dataIngredients.map((el) => { 
            if (el.type === "bun") {
              return (<BurgerFirstItem ingredient={el} />);
            } else 
            return (<BurgerMiddleItem ingredient={el} />);
          })}
        </ul>
      <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button> 
        </section>   
      );
}
}

export default BurgerConstructor;