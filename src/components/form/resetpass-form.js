import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassThunk } from "../../services/actions/user";
import stylesForm from "./form.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {values, handleChange} = useForm({ password: '' })
  const [valueNumber, setValueNumber] = React.useState("");
  const onChangeNumber = (e) => {
    setValueNumber(e.target.value);
  };
  
  const onSubmitNewPassword = (e) => {
    e.preventDefault();
    if (values.password && valueNumber) {
      dispatch(resetPassThunk(values.password, valueNumber, () => navigate("/")));
    };
};

  return (
    <form className={`${stylesForm.container}`} onSubmit={onSubmitNewPassword}>
      <h1 className={`${stylesForm.text} text text_type_main-medium`}>
        Восстановление пароля
      </h1>
      <PasswordInput
        onChange={handleChange}
        value={values}
        name={"password"}
        placeholder={"Введите новый пароль"}
        extraClass="mt-6 mb-6"
      />
      <Input
        value={valueNumber}
        onChange={onChangeNumber}
        placeholder={"Ввведите код из письма"}
        name={"number"}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={"mb-20"}
        // onClick={}
      >
        Сохранить
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

export default ResetPasswordForm;
