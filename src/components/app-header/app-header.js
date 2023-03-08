import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeader from "./app-header.module.css";

const AppHeader = () => {
  const activeStyle = {
    color: "#f2f2f3",
  };
  const { pathname } = useLocation();
  
    return (
      <header className={`${appHeader.header}`}>
        <nav className={`${appHeader.container} pt-4 pb-4`}>
          <ul className={appHeader.nav}>
            <ul className={appHeader.items}>
              <NavLink className={`${appHeader.item} pl-5 pr-4 mr-2`} to='/' style={pathname === "/" ? activeStyle : undefined}>
                <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
                <p className={`ml-2`}>Конструктор</p>
              </NavLink>
              <NavLink className={`${appHeader.item} pl-5 pr-5 `} to='/feed' style={pathname === "/feed" || "/feed/:id" ? activeStyle : undefined}>
                <ListIcon type={pathname === "/feed" || "/feed/:id" ? "primary" : "secondary"} />
                <p className={`ml-2`}>Лента заказов</p>
              </NavLink>
            </ul>
            <li className={appHeader.item}>
              <NavLink className={appHeader.logo} to='/' >
                <Logo />
              </NavLink>
            </li>
            <NavLink className={`${appHeader.item} pl-5 pr-5 `} to='/profile' style={pathname === "/profile" || "/profile/orders" || "/profile/orders/:id" ? activeStyle : undefined}>
              <ProfileIcon type={pathname === "/profile" || "/profile/orders" || "/profile/orders/:id" ? "primary" : "secondary"} />
              <p className={`ml-2`}>Личный кабинет</p>
            </NavLink>
          </ul>
        </nav>
      </header>
    );
  };


export default AppHeader;
