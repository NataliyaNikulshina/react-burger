import LoginForm from "../components/form/login-form";
import Loader from "../components/loader/loader";
import { useSelector } from "../services/hooks";
import { FC } from "react";


//import { Breadcrumbs } from '../components/breadcrumbs';

const LoginPage: FC = () => {
  const isLoading = useSelector((state) => state.ingredients.itemsRequest);

  return (
    isLoading ? 
      <Loader />
    : 
    <LoginForm />
  );
}

export default LoginPage;