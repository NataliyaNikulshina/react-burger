import styleLoader from "./loader.module.css";
import { FC } from 'react';

const Loader: FC = () => {
  return (
        <div className={styleLoader.loader} id="loader"></div>
  );
};

export default Loader;
