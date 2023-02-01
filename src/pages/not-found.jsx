import React from 'react';
import { Link } from 'react-router-dom';

//import styles from './not-found.module.css';

//import { Breadcrumbs } from '../components/breadcrumbs';

const NotFound404 = () => {

  return (
    <div>
      <div>
        {/* <Breadcrumbs /> */}
        <div>
          <h1>Oops! 404 Error</h1>
          <p>The page you requested does not exist</p>
          <br />
          <br />
          <p>check the address or try <Link to='/'>homepage</Link></p>
        </div>
      </div>
    </div>
  );
}

export default NotFound404;