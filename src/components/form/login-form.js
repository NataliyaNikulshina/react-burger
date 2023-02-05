import React from "react";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Button,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import stylesLoginForm from "./form.module.css";

const LoginForm = () => {
  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };
  const [valuePass, setValuePass] = React.useState("");
  const onChangePassword = (e) => {
    setValuePass(e.target.value);
  };

  return (
    <form className={`${stylesLoginForm.container}`}>
      <h1 className={`${stylesLoginForm.text} text text_type_main-medium`}>
        Вход
      </h1>
      <EmailInput
        onChange={onChangeEmail}
        value={valueEmail}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mt-6 mb-6"
      />
      <PasswordInput
        onChange={onChangePassword}
        value={valuePass}
        name={'password'}
        extraClass="mb-6"
      />
      <Button
        htmlType="button"
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
        <Link to={"/register"} className={`${stylesLoginForm.link} text text_type_main-default`}>
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
