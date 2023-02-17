import { Link } from "react-router-dom";
import styles from "./not-found.module.css";
import AppHeader from "../components/app-header/app-header";

const NotFound404 = () => {
  return (
    <div className={styles.background}>
      <AppHeader />
      <div className={styles.container}>
        <h1 className={`${styles.text} text text_type_main-large`}>Упс!</h1>
        <h1 className={`${styles.text} text text_type_digits-large`}>404</h1>
        <p className={`${styles.text} text text_type_main-medium`}>Страница не найдена</p>

        <p className={`${styles.text} text text_type_main-medium`}>
          Вернись на <Link className={`${styles.link}`} to="/">главную страницу</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound404;
