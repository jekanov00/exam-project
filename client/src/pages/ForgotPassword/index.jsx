import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from './ForgotPassword.module.sass';
import CONSTANTS from '../../constants';
import ForgotForm from '../../components/forms/ForgotForm';
import { userSelector } from '../../selectors';
import { forgotRequest } from '../../actions/actionCreator';

function ForgotPassword() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    document.title = 'Restore Password | Squadhelp';
  });

  const handleSubmit = useCallback((values) => dispatch(forgotRequest(values)), [dispatch]);

  if (user) {
    return <Redirect to={'/'} />;
  }

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
