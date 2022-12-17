import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeader from "./app-header.module.css";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${appHeader.header}`}>
        <nav className={`${appHeader.container} pt-4 pb-4`}>
          <ul className={appHeader.nav}>
            <ul className={appHeader.items}>
              <a className={`${appHeader.item} pl-5 pr-4 mr-2`}>
                <BurgerIcon type="primary" />
                <p className="ml-2">Конструктор</p>
              </a>
              <a className={`${appHeader.item} pl-5 pr-5 `}>
                <ListIcon type="secondary" />
                <p className={`${appHeader.text} ml-2`}>Лента заказов</p>
              </a>
            </ul>
            <li className={appHeader.item}>
              <div className={appHeader.logo}>
                <Logo />
              </div>
            </li>
            <a className={`${appHeader.item} pl-5 pr-5 `}>
              <ProfileIcon type="secondary" />
              <p className={`${appHeader.text} ml-2`}>Личный кабинет</p>
            </a>
          </ul>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
