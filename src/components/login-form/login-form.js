import React from 'react';
import { Link } from 'react-router-dom';
import {
    EmailInput, Button
  } from "@ya.praktikum/react-developer-burger-ui-components";

import stylesLoginForm from './login-form.module.css';

const LoginForm = () => {
    const [value, setValue] = React.useState('')
    const onChange = e => {
      setValue(e.target.value)
    }

  return (
      <div className={`${stylesLoginForm.container} mb-45`}>
        <h1 className="text text_type_main-medium mb-5">Вход</h1>
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        placeholder="Логин"
        isIcon={false}
        extraClass="mb-2"
      />
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        placeholder="Пароль"
        isIcon={true}
        extraClass="mb-2"
      />
      <Button
            htmlType="button"
            type="primary"
            size="large"
           // onClick={}
          >
            Войти
          </Button>
          <div>
                <p className={"text text_type_main-default"}>Вы - новый пользователь?</p>
                <Link to={"/register"} className={`text text_type_main-default `}>Зарегистрироваться</Link>
            </div>
            <div>
                <p className={`text text_type_main-default text_color_inactive`}>Забыли пароль?</p>
                <Link to={"/forgot-password"} className={`text text_type_main-default `}>Востановить пароль</Link>
            </div>
    </div>
  );
}

export default LoginForm;