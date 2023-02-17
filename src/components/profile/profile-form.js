import {useState, useEffect, useCallback} from "react";
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
  
  const [isEdit, setEdit] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getToken();

  const user = useSelector((state) => state.user.userData);
  const [values, setValues] = useState({
    email: `${user ? user.email : ""}`,
    password: "",
    name: `${user ? user.name : ""}`,
  });

  const isEditValue = isEdit === null ? false : isEdit?.name !== values.name || isEdit?.email !== values.email || values.password !== ""

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  useEffect(() => {
    setEdit(user)
   // console.log(isEditValue)
},[])

  
  function onReset() {
    setValues({ name: user.name, password: "", email: user.email });
  }

  const updateProfileInfo = ({email,name, password}, token) => {
    const userInfo = {email,name}
    console.log(token)
    // eslint-disable-next-line no-unused-expressions
    password !== "" ? userInfo.password = password : false
    return dispatch(updateUserData(userInfo,token));
}

  const updateSubmit = useCallback(
    (e) => {
      e.preventDefault();
      updateProfileInfo(values, token)
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
      { isEditValue && (
        <>
          <Button extraClass="mr-2" type="primary" htmlType={"submit"}>Подтвердить</Button>
          <Button type="secondary" htmlType={"button"} onClick={onReset}>Отмена</Button>
        </>
      )}
    </form>
  );
};

export default ProfileForm;
