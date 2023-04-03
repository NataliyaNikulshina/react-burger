import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassThunk } from "../../services/actions/user";
import stylesForm from "./form.module.css";
import { useDispatch } from "../../services/hooks";
import { useForm } from "../../hooks/useForm";

const ForgotPasswordForm: FC = () => {
  const { values, handleChange } = useForm( { email: '', password: '', name: ''} );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email) {
    dispatch(forgotPassThunk(values.email, () => navigate("/reset-password")));
    };
  };

  return (
    <form className={`${stylesForm.container}`} onSubmit={onSubmitEmail}>
      <h1 className={`${stylesForm.text} text text_type_main-medium`}>
        Восстановление пароля
      </h1>
      <EmailInput
        onChange={handleChange}
        value={values.email}
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
