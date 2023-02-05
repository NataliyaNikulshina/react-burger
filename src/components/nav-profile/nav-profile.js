
import { Link, NavLink} from 'react-router-dom';
import styleProfile from './nav-profile.module.css';


const NavProfile = () => {

  return (
        <nav>
            <div>
                <NavLink
                    to={{ pathname: '/profile' }} 
                   // className={styles.textProfile}
                   // activeClassName={styles.styleActiveClass}
                   >
                    <p>Профиль</p>
                </NavLink>
                <NavLink to={{ pathname: `/profile/orders` }} 
                    //className={styles.textProfile}
                    //activeClassName={styles.styleActiveClass}
                    >
                    <p>История заказов</p>
                </NavLink>
                <Link to={{ pathname: `/` }} >
                    <li  > <p>Выход</p> </li>
                </Link>
            </div>
            <div>
                <p>
                    В этом разделе Вы можете изменить свои персональные данные
                </p>
            </div>
        </nav>
  );
}

export default NavProfile;