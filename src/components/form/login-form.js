import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import stylesLoginForm from "./form.module.css";
import { loginUserThunk } from "../../services/actions/user";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((store) => store.user.userData);
  const [valuesLogin, setValuesLogin] = React.useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValuesLogin((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };
 // console.log(loginData);
 // console.log(valuesLogin);

  const loginSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginUserThunk(valuesLogin, () => navigate("/")));
    },
    [loginData, dispatch, valuesLogin]
  );

  return (
    <form className={`${stylesLoginForm.container}`} onSubmit={loginSubmit}>
      <h1 className={`${stylesLoginForm.text} text text_type_main-medium`}>
        Вход
      </h1>
      <EmailInput
        onChange={onChange}
        value={valuesLogin.email}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mt-6 mb-6"
      />
      <PasswordInput
        onChange={onChange}
        value={valuesLogin.password}
        name={"password"}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={"mb-20"}
        // onClick={}
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
