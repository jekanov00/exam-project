import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.sass';
import CONSTANTS from '../../constants';
import ForgotForm from '../../components/forms/ForgotForm';
import { forgotRequest } from '../../actions/actionCreator';

function ForgotPassword() {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (values) => {
      dispatch(forgotRequest(values));
    },
    [dispatch],
  );

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
        <div className={styles.forgotFormContainer}>
          <ForgotForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
