import { useState, useEffect, useCallback, FC, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserDataThunk, checkUserThunk } from "../../services/actions/user";
import { getRefreshToken, getToken } from "../../hooks/useTokens";
import stylesForm from "./profile-form.module.css";
import { useSelector, useDispatch } from "../../services/hooks";
import { logoutThunk } from "../../services/actions/user";
import { IUserLogin, IUserRegister, TUseForm, IUser } from "../../services/types/data";



const ProfileForm: FC = () => {
  
  const [isEdit, setEdit] = useState({email: '', password: '', name: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getToken();

  const user = useSelector((state) => state.user.userDataRegister);
  const [values, setValues] = useState<IUserRegister>({
    email: `${user ? user.email : ""}`,
    password: "",
    name: `${user ? user.name : ""}`,
  });

  const isEditValue = isEdit === null ? false : isEdit?.name !== values.name || isEdit?.email !== values.email || values.password !== ""

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  useEffect(() => {
    if (user){
    setEdit(user)}
   // console.log(isEditValue)
},[])

  
  function onReset() {
    if (user){
    setValues({ name: user.name, password: "", email: user.email });
    }
  }

  const updateProfileInfo = ( valuesForm: TUseForm, token: string ) => {
    //const userInfo = {email,name,password};
    console.log(valuesForm);
    console.log(values);
    if (valuesForm.password !== "") {return valuesForm.password === values.password} 
    dispatch(updateUserDataThunk(valuesForm,token));
}

  const updateSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (token) {
      updateProfileInfo(values, token)
      }
      //console.log(values)
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
          <Button extraClass="mr-2" type="primary" htmlType={"submit"}>Сохранить</Button>
          <Button type="secondary" htmlType={"button"} onClick={onReset}>Отмена</Button>
        </>
      )}
    </form>
  );
};

export default ProfileForm;
