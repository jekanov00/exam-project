import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.sass';
import CONSTANTS from '../../constants';
import ForgotForm from '../../components/forms/ForgotForm';

function ForgotPassword() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.forgotContainer}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </Link>
        </div>
        <div className={styles.forgotFormContainer}>
          <ForgotForm />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
