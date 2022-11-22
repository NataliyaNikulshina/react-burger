import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon , Box} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './app-header.module.css';

class AppHeader extends React.Component {
    render() {
      return (
        <header className={`${appHeader.header} mt-10 mb-10`}>
          <nav className={`${appHeader.container} pt-4 pb-4`}>
            <ul className={appHeader.items}>
                    <li className={appHeader.item}>
                        <BurgerIcon type="primary" />
                        <p className='ml-2'>Конструктор</p>
                    </li>
                    <li className={appHeader.item}>
                        <ListIcon type="secondary" />
                        <p className={`${appHeader.text} ml-2`}>Лента заказов</p>
                    </li>
                    <li className={appHeader.item}>
                      <div className={appHeader.logo}>
                        <Logo /> 
                      </div>
                    </li>
                    <li className={appHeader.item}>
                        <ProfileIcon type="secondary" />
                        <p className={`${appHeader.text} ml-2`}>Личный кабинет</p>
                    </li>
                </ul>
          </nav> 
        </header>
 );
}
}

export default AppHeader;