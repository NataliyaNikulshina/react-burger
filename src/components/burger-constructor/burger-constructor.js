import React from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './burger-constructor.module.css';
import {dataIngredients} from '../../utils/data.js';

function BurgerFirstItem ({ingredient}){
  return (
      <div className={`${burgerConstructor.element} mr-4 mb-4`}>
      <ConstructorElement
        type='top'
        isLocked={true}
        text={`${ingredient.name} (верх)`} 
        price={ingredient.price}
        thumbnail={ingredient.image}
        />
       </div>
  )
}

function BurgerMiddleItem ({ingredient}){
  return (
    <li className={`${burgerConstructor.item} mr-2 mb-4 ml-4`}>
      <DragIcon type="primary"/>
      <div className={`${burgerConstructor.element}`}>
        <ConstructorElement 
          type=''
          text={`${ingredient.name}`} 
          price={ingredient.price}
          thumbnail={ingredient.image}
          />
      </div>
    </li>
  )
}

function BurgerLastItem ({ingredient}){
  return (
    <div className={`${burgerConstructor.element} mr-4 mt-4`}>
        <ConstructorElement
        type='bottom'
        isLocked={true}
        text={`${ingredient.name} (низ)`} 
        price={ingredient.price}
        thumbnail={ingredient.image}
        />
      </div>
  )
}

class BurgerConstructor extends React.Component {
    render() {
      const bun = dataIngredients.find(function (el) { 
        return el.type === "bun";
      });
      return (
        <section className={`${burgerConstructor.container} mt-15`}>
          <BurgerFirstItem ingredient={bun} key={bun.id}/>
          <ul className={`${burgerConstructor.list}`}>
            {dataIngredients.map((el) => { 
              if (el.type !== "bun") {
                return (<BurgerMiddleItem ingredient={el} key={el.id}/>);
              } 
            })}
          </ul>
          <BurgerLastItem ingredient={bun} key={bun.id}/>
          <ul className={`${burgerConstructor.result} mt-10`}>
            <p className="text text_type_digits-medium">610</p>
            <li className={`${burgerConstructor.icon} ml-2 mr-10`}>
              <CurrencyIcon type="primary"/>
            </li>
            <li className="mr-4">
              <Button htmlType="button" type="primary" size="large">
                Оформить заказ
              </Button> 
            </li>
          </ul>
        </section>   
      );
}
}

export default BurgerConstructor;