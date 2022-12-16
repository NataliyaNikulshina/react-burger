import React, { useContext } from "react";
import totalPrice from "./total-price.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { TotalPriceContext } from "../../context/app-context.js";

export const TotalPrice = ({children}) => {
  const { totalPrice } = useContext(TotalPriceContext);

  return (
    <>
      <p className="text text_type_digits-medium">{children}</p>
      <li className={`${totalPrice.icon} ml-2 mr-10`}>
        <CurrencyIcon type="primary" />
      </li>
    </>
  );
};
