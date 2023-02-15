import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassThunk } from "../../services/actions/user";
import stylesForm from "./form.module.css";
import { useDispatch } from "react-redux";

const ForgotPasswordForm = () => {
  const [valueEmail, setValueEmail] = React.useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const onSubmitEmail = (e) => {
        e.preventDefault();
        dispatch(forgotPassThunk(valueEmail, () => navigate("/reset-password")));
    };

  return (
    <form className={`${stylesForm.container}`} onSubmit={onSubmitEmail}>
      <h1 className={`${stylesForm.text} text text_type_main-medium`}>
        Восстановление пароля
      </h1>
      <EmailInput
        onChange={onChangeEmail}
        value={valueEmail}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mt-6 mb-6"
      />
      <Button
        disabled={valueEmail === "" ? true : false}
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
