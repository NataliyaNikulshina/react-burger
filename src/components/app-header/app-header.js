import React from "react";
import { NavLink, useResolvedPath, useLocation } from "react-router-dom";
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
              <NavLink className={`${appHeader.item} pl-5 pr-5 `} to='/profile/orders' style={pathname === "/profile/orders" ? activeStyle : undefined}>
                <ListIcon type={pathname === "/profile/orders" ? "primary" : "secondary"} />
                <p className={`ml-2`}>Лента заказов</p>
              </NavLink>
            </ul>
            <li className={appHeader.item}>
              <div className={appHeader.logo}>
                <Logo />
              </div>
            </li>
            <NavLink className={`${appHeader.item} pl-5 pr-5 `} to='/profile' style={pathname === "/profile" ? activeStyle : undefined}>
              <ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"} />
              <p className={`ml-2`}>Личный кабинет</p>
            </NavLink>
          </ul>
        </nav>
      </header>
    );
  };


export default AppHeader;
