import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postEmailForReset } from "../../utils/api";
import stylesForm from "./profile-form.module.css";
import {useSelector, useDispatch} from "react-redux";
import {
  logoutThunk
} from "../../services/actions/user";

const ProfileForm = () => {
  const user = useSelector(store => store.user.data);
//  reduserUser = {name: user.name, email: user.email, isAuth: !!user.email};
  const dispatch = useDispatch();
    let [values, setValues] = React.useState({
      email: "",
      password: "",
      name: "",
    });

    const onChange = (event) => {
      const { name, value } = event.target;
      setValues((prevValues) => {
        return { ...prevValues, [name]: value };
      });
    };
  
  
  const navigation = useNavigate()

  const registerSubmit = React.useCallback(
    (e) => {
        e.preventDefault();
        if (user) return;
        //dispatch(registerUser(values));
       // user.replace({ pathname: '/login' });
        navigation('/login');
    }, [dispatch, user, values]);

  return (
    <form className={`${stylesForm.container}`} onSubmit={registerSubmit}>
       <Input
        value={values.name}
        onChange={onChange}
        placeholder={"Имя"}
        type={"text"}
        name={"name"}
        icon="EditIcon"
        extraClass="mb-6"
      />
      <EmailInput
        onChange={onChange}
        value={values.email}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="mt-6 mb-6"
      />
      <PasswordInput
        onChange={onChange}
        value={values.password}
        name={'password'}
        placeholder="Пароль"
        extraClass="mb-6"
        icon="EditIcon"
      />
      <Button htmlType={"submit"}>Подтвердить</Button>
      <Button htmlType={"reset"}>Сбросить</Button>
    </form>
  );
};

export default ProfileForm;
