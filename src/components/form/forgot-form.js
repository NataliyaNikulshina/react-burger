import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassThunk } from "../../services/actions/user";
import stylesForm from "./form.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";

const ForgotPasswordForm = () => {
  const { values, handleChange } = useForm({ email: "", });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitEmail = (e) => {
    e.preventDefault();
    dispatch(forgotPassThunk(values.email, () => navigate("/reset-password")));
  };

  return (
    <form className={`${stylesForm.container}`} onSubmit={onSubmitEmail}>
      <h1 className={`${stylesForm.text} text text_type_main-medium`}>
        Восстановление пароля
      </h1>
      <EmailInput
        onChange={handleChange}
        value={values}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mt-6 mb-6"
      />
      <Button
        disabled={values.email === "" ? true : false}
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={"mb-20"}
      >
        Восстановить
      </Button>
      <div className={`${stylesForm.wrapper} mb-4`}>
        <p
          className={`${stylesForm.text} text text_type_main-default text_color_inactive`}
        >
          Вспомнили пароль?
        </p>
        <Link
          to={"/login"}
          className={`${stylesForm.link} text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
