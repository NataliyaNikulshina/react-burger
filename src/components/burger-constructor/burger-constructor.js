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
import { postOrder } from "../../services/actions/order";
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
import {POST_ORDER_DETAILS_RESET} from '../../services/actions/order';

const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((state) => state.constructor);
  // console.log(ingredients);
  const dispatch = useDispatch();
  const orderNumber = useSelector((state) => state.order);
  //console.log(orderNumber);
  const { isAuth } = useSelector((store) => ({
    isAuth: store.user.isAuth,
  }));

  const calculationPrice = React.useMemo(() => {
    if (bun && ingredients) {
      const sum = bun.price * 2;
      const total = sum + ingredients.reduce((prev, el) => prev + el.price, 0);
      return total;
    } else return "0";
  }, [ingredients, bun]);

  const [visibility, changeVisibility] = React.useState(false);

  const navigate = useNavigate();

  const postOrderNumer = () => {
    if (bun && ingredients) {
      dispatch(postOrder(dataPostId()));
    }
    else { alert("выберете ингредиенты");}
  };

  const handleOrderModal = (e) => {
    console.log("нажали на нопку");
    if (!isAuth) {
      navigate("/login");
    } else {
      postOrderNumer();
      changeVisibility(true);
    }
    console.log(visibility)
    console.log(orderNumber)
  };

  function closeModal(e) {
    e.stopPropagation();
    dispatch(resetIngConstructor());
    dispatch({type: POST_ORDER_DETAILS_RESET});
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

  const onDropHandler = (ingredient) => {
    if (ingredient.type === "bun") {
      dispatch(setBunConstructor(ingredient));
    } else {
      dispatch(addIngConstructor(ingredient));
      //console.log(ingredient)
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
          >
            Оформить заказ
          </Button>
        </li>
      </ul>

      {visibility && !(orderNumber.orderNum === "") && (
        <Modal setClose={closeModal}>
          <OrderDetails
            orderNumber={orderNumber.orderNum.order.number}
            isLoading={orderNumber.orderNum.order.orderRequest}
          />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
