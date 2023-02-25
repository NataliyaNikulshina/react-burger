import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch} from "react-redux";
import stylesForm from "./form.module.css";
import {
  registerUserThunk
} from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user.userData);
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const registerSubmit = React.useCallback(
    (e) => {
        e.preventDefault();
        if (user) return;
        dispatch(registerUserThunk(values));
        navigate(-1);
    }, [dispatch, user, values]);

  return (
    <form className={`${stylesForm.container}`} onSubmit={registerSubmit}>
      <h1 className={`${stylesForm.text} text text_type_main-medium`}>
        Регистрация
      </h1>
      <Input
        value={values.name}
        onChange={handleChange}
        placeholder={"Name"}
        name={"name"}
        extraClass="mt-6 mb-6"
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={'password'}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={"mb-20"}
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
