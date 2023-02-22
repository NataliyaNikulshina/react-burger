import LoginForm from "../components/form/login-form";
import Loader from "../components/loader/loader";
import { useSelector, useDispatch } from "react-redux";


//import { Breadcrumbs } from '../components/breadcrumbs';

const LoginPage = () => {
  const isLoading = useSelector((state) => state.ingredients.itemsRequest);

  return (
    isLoading ? 
      <Loader />
    : 
    <LoginForm />
  );
}

export default LoginPage;