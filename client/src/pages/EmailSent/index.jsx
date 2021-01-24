import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './EmailSent.module.sass';
import CONSTANTS from '../../constants';

function EmailSent() {
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
            <p>Confirmation link was sent to your email box.</p>
            <p>Please follow the link in the email to complete password restoration.</p>
            <p>If you don't see the email check the spam folder.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSent;
