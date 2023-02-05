import React from "react";
import { Link } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import stylesForm from "./form.module.css";

const RegisterForm = () => {
  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };
  const [valuePass, setValuePass] = React.useState("");
  const onChangePassword = (e) => {
    setValuePass(e.target.value);
  };
  const [valueName, setValueName] = React.useState("");
  const onChangeName = (e) => {
    setValueName(e.target.value);
  };

  return (
    <form className={`${stylesForm.container}`}>
      <h1 className={`${stylesForm.text} text text_type_main-medium`}>
        Регистрация
      </h1>
      <Input
        value={valueName}
        onChange={onChangeName}
        placeholder={"Name"}
        name={"name"}
        extraClass="mt-6 mb-6"
      />
      <EmailInput
        onChange={onChangeEmail}
        value={valueEmail}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mb-6"
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
        Зарегистрироваться
      </Button>
      <div className={`${stylesForm.wrapper} mb-4`}>
        <p
          className={`${stylesForm.text} text text_type_main-default text_color_inactive`}
        >
          Уже зарегистрированы?
        </p>
        <Link to={"/login"} className={`${stylesForm.link} text text_type_main-default`}>
          Войти
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
