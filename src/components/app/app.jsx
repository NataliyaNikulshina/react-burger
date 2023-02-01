import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/home';
import NotFound404 from '../../pages/not-found';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';

export default function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} />
      {/*  <Route path="/list/:country/:personId" element={<PersonPage />} />*/}
        <Route path="*" element={<NotFound404 />}/>
      </Routes>
    </BrowserRouter>
  );
}