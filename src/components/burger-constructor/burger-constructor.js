import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addIngConstructor,
  setBunConstructor,
  resetIngConstructor,
} from "../../services/actions/constructor";
import {
  BurgerFirstItem,
  BurgerMiddleItem,
  BurgerLastItem,
} from "../burger-item/burger-item";
import {
  postOrderReset,
  createOrderAction,
  createOrderActionThunk
} from "../../services/actions/order";
import Loader from "../loader/loader";

const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((state) => state.constructor);
  // console.log(ingredients);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  //console.log(orderNumber);
  console.log(order)
  const { isAuth } = useSelector((store) => ({
    isAuth: store.user.isAuth,
  }));

  const calculationPrice = React.useMemo(() => {
    if (bun && ingredients) {
      const sum = bun.price * 2;
      const total = sum + ingredients.reduce((prev, el) => prev + el.price, 0);
      return total;
    } else {
      if (bun) {
        const sum = bun.price * 2;
        return sum; 
      } else return "0";}
  }, [ingredients, bun]);

  const [visibility, changeVisibility] = React.useState(false);

  const navigate = useNavigate();

  const handleOrderModal = (e) => {
    if (!isAuth) {
      navigate("/login");
    } else {
      changeVisibility(true);
      dispatch(createOrderActionThunk(ingredients, bun));
      // postOrderNumer();
    }
  };

  function closeModal(e) {
    e.stopPropagation();
    dispatch(resetIngConstructor());
    dispatch(postOrderReset());
    changeVisibility(false);
  }

  function dataPostId() {
    const arrOrder = [bun, ...ingredients.map((item) => item), bun].map(
      (ing) => ing._id
    );
    //console.log(arrOrder);
    return arrOrder;
  }

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      onDropHandler(itemId);
    },
  });

  const onDropHandler = ({ingredient}) => {
    if (ingredient.type === "bun") {
      dispatch(setBunConstructor(ingredient));
      console.log('bun' + ingredient)
    } else {
      dispatch(addIngConstructor(ingredient));
      console.log(ingredient)
    }
  };

  return (
    <section
      className={`${burgerConstructor.container} mt-15`}
      ref={dropTarget}
    >
      <div className={`${burgerConstructor.element} mr-4 mb-4`}>
        {bun ? (
          <BurgerFirstItem ingredient={bun} />
        ) : (
          <p className="text text_type_main-medium">Перетащи сюда булку</p>
        )}
      </div>
      <ul className={`${burgerConstructor.list}`}>
        {(bun || ingredients) &&
          (ingredients ? (
            ingredients.map((el, index) => {
              return (
                <BurgerMiddleItem
                  ingredient={el}
                  key={el._idInBasket}
                  index={index}
                />
              );
            })
          ) : (
            <>
              <p
                className="text text_type_main-medium"
                style={{ width: "500px" }}
              >
                А теперь перетащи сюда{" "}
              </p>
              <p
                className="text text_type_main-medium"
                style={{ width: "500px" }}
              >
                начинку и соусы{" "}
              </p>
            </>
          ))}
      </ul>
      <div className={`${burgerConstructor.element} mr-4 mb-4`}>
        {bun && <BurgerLastItem ingredient={bun} />}
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
            onClick={handleOrderModal}
            disabled={!(ingredients && bun)}
          >
            Оформить заказ
          </Button>
        </li>
      </ul>

      {visibility && (
        <Modal onClose={closeModal}>
          { order.orderRequest ? (
            <Loader /> 
          ) : ( 
            <OrderDetails
              orderNumber={order.order.order.number}
              isLoading={order.orderRequest}
            />
          )}
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
