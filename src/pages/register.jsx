import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from "../components/app-header/app-header";
import RegisterForm from '../components/form/register-form';

//import styles from './not-found.module.css';

const RegisterPage = () => {

  return (
    <>
    <AppHeader />
    <RegisterForm />
    </>
  );
}

export default RegisterPage;