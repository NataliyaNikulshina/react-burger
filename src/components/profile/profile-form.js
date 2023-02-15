import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserData, checkUser } from "../../services/actions/user";
import { getRefreshToken, getToken } from "../../hooks/useTokens";
import stylesForm from "./profile-form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../../services/actions/user";

const ProfileForm = () => {
  //  reduserUser = {name: user.name, email: user.email, isAuth: !!user.email};
  const [isEdit, setEdit] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getRefreshToken();

  const user = useSelector((state) => state.user.userData);

  const [values, setValues] = React.useState({
    email: `${user ? user.email : ""}`,
    password: "",
    name: `${user ? user.name : ""}`,
  });
  
  function onReset() {
    setValues({ name: user.name, email: user.email });
  }

  React.useEffect(() => {
    if ((user.email !== values.email) && (user.name !== values.name)) {
      setEdit(true);
      console.log(isEdit)
    //  console.log(values)
    //  console.log(user)
    }
  }, [values, user]);

  //console.log(user);
  //    let [values, setValues] = React.useState({
  //      email: "",
  //      password: "",
  //      name: "",
  //    });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  const updateSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUserData(values,() => navigate('/login'), token));
      console.log(values)
    },
    [dispatch, user, values]
  );

  return (
    <form className={`${stylesForm.container}`} onSubmit={updateSubmit}>
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
        value={values.password === 'underfined' ? '*****': values.password}
        name={"password"}
        placeholder="Пароль"
        extraClass="mb-6"
        icon="EditIcon"
      />
      { isEdit && (
        <>
          <Button extraClass="mr-2" htmlType={"submit"}>Подтвердить</Button>
          <Button htmlType="button" onClick={onReset}>Отмена</Button>
        </>
      )}
    </form>
  );
};

export default ProfileForm;
