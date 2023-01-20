import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { postOrder } from "../../services/actions/order";
import { useDrop } from 'react-dnd';
import { addIngConstructor, setBunConstructor, resetIngConstructor} from "../../services/actions/constructor";
import { BurgerFirstItem, BurgerMiddleItem, BurgerLastItem } from "../burger-item/burger-item";


const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((state) => state.constructor);
 // console.log(ingredients);
  const dispatch = useDispatch();
  const orderNumber = useSelector((state) => state.order);
  //console.log(orderNumber);


  const calculationPrice = React.useMemo(() => {
    if (bun && ingredients) {
      const sum = bun.price * 2; 
      const total = sum + ingredients.reduce((prev, el) => prev + el.price, 0);
      return total;
  } else return '0'}, [ingredients, bun]);

  const [visibility, changeVisibility] = React.useState(false);

  function openModal(e) {
    e.stopPropagation();
    postOrderNumer();
    changeVisibility((prevValue) => !prevValue);
  }

  function closeModal(e) {
    e.stopPropagation();
    changeVisibility((prevValue) => !prevValue);
  }

  function dataPostId() {
        const arrOrder =  [bun, ...ingredients.map(item => item), bun].map(ing => ing._id) ;
        //console.log(arrOrder);
        return arrOrder;
}

  const postOrderNumer = () => {
    if (bun && ingredients) {
      dispatch(postOrder(dataPostId()));
      dispatch(resetIngConstructor());}
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      onDropHandler(itemId);
    },
});

const onDropHandler = (ingredient) => {
  if (ingredient.type === "bun") {
      dispatch(setBunConstructor(ingredient))
  }
  else {
      dispatch(addIngConstructor(ingredient));
      //console.log(ingredient)
  }
}


  /*const modalOrderDetails = (
    <Modal setClose={closeModal}>
      <OrderDetails orderNumber={orderNumber.orderNum.order.number} />
    </Modal>
  );*/

  return (
    <section className={`${burgerConstructor.container} mt-15`} ref={dropTarget}>
      <div className={`${burgerConstructor.element} mr-4 mb-4`}>
      { bun ? 
        (<BurgerFirstItem ingredient={bun} /> ) :  <p className='text text_type_main-medium'>Перетащи сюда булку</p> }
      </div>
      <ul className={`${burgerConstructor.list}`}>
        {(bun || ingredients)  && (ingredients ? ingredients.map((el, index) => {
            return <BurgerMiddleItem ingredient={el} key={el._idInBasket} index={index}/>;
        }) : <>
        <p className='text text_type_main-medium' style={{ width: '500px' }}>А теперь перетащи сюда </p>
        <p className='text text_type_main-medium' style={{ width: '500px' }}>начинку и соусы </p>
        </>)}
      </ul>
      <div className={`${burgerConstructor.element} mr-4 mb-4`}>
      { bun && ( <BurgerLastItem ingredient={bun} /> )}
      </div>
      
      <ul className={`${burgerConstructor.result} mt-10`}>
        <p className="text text_type_digits-medium">{calculationPrice}</p>
        <li className={`${burgerConstructor.icon} ml-2 mr-10`}>
          <CurrencyIcon type="primary" />
        </li>
        <li className="mr-4">
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openModal}
          >
            Оформить заказ
          </Button>
        </li>
      </ul> 

      {visibility && !(orderNumber.orderNum === "") && (
        <Modal setClose={closeModal}>
          <OrderDetails orderNumber={orderNumber.orderNum.order.number} isLoading={orderNumber.orderNum.order.orderRequest} />
        </Modal>
      )} 
    </section>
  );
};

export default BurgerConstructor;
