import React, { FC } from "react";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
import stylesLoginForm from "./form.module.css";
import { loginUserThunk } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";


const LoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || '/';
  const loginData = useSelector((store) => store.user.userData);
  const { values, handleChange } = useForm({email: '', password: '', name: ''});
  // const { isAuth } = useSelector((store) => ({
  //   isAuth: store.user.isAuth
  // }));

  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(loginUserThunk(values));
      navigate(-1);
      // ...то отправляем его на предыдущую страницу
    //  return <Navigate to={ from } />;
    
  };

  return (
    <form className={`${stylesLoginForm.container}`} onSubmit={loginSubmit}>
      <h1 className={`${stylesLoginForm.text} text text_type_main-medium`}>
        Вход
      </h1>
      <EmailInput
        onChange={handleChange}
        value={values.email!}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mt-6 mb-6"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password!}
        name={"password"}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={"mb-20"}
      >
        Войти
      </Button>
      <div className={`${stylesLoginForm.wrapper} mb-4`}>
        <p
          className={`${stylesLoginForm.text} text text_type_main-default text_color_inactive`}
        >
          Вы - новый пользователь?
        </p>
        <Link
          to={"/register"}
          className={`${stylesLoginForm.link} text text_type_main-default`}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={`${stylesLoginForm.wrapper}`}>
        <p
          className={`${stylesLoginForm.text} text text_type_main-default text_color_inactive`}
        >
          Забыли пароль?
        </p>
        <Link
          to={"/forgot-password"}
          className={`${stylesLoginForm.link} text text_type_main-default `}
        >
          Востановить пароль
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
