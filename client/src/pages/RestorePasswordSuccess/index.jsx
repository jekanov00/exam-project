import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './RestorePasswordSuccess.module.sass';
import CONSTANTS from '../../constants';
import { restoreTokenRequest } from '../../actions/actionCreator';
import { authSelector } from '../../selectors';
import Spinner from '../../components/Spinner/Spinner';

function RestorePasswordSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Restore Password';
    if (window.location.pathname.slice(0, 9) === '/restore/') {
      dispatch(restoreTokenRequest(window.location.pathname.slice(9)));
    }
  }, [dispatch]);

  const { isFetching, error } = useSelector(authSelector);

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
            {isFetching ? (
              <Spinner />
            ) : error ? (
              <>
                <p>User with this email not found.</p>
                <p>Back to login:</p>
              </>
            ) : (
              <>
                <p>Your password has completely changed.</p>
                <p>Now you can login to your account</p>
              </>
            )}
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
