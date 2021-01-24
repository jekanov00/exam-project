import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './RestorePasswordSuccess.module.sass';
import CONSTANTS from '../../constants';

function RestorePasswordSuccess() {
  useEffect(() => {
    document.title = 'Restore Password';
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.forgotContainer}>
        <div className={styles.headerContainer}>
          <Link to="/">
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </Link>
          <div className={styles.linkLoginContainer}>
            <Link to={'/login'} className={styles.linkLogin}>
              LOGIN
            </Link>
          </div>
        </div>
        <div className={styles.restoreContainer}>
          <div className={styles.textContainer}>
            <p>Your password has completely changed.</p>
            <p>Now you can login to your account</p>
            <Link to={'/login'} className={styles.backToLogin}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestorePasswordSuccess;
