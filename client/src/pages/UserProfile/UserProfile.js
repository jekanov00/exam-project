import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import styles from './UserProfile.module.sass';
import CONSTANTS from '../../constants';
import UserInfo from '../../components/UserInfo/UserInfo';
import PayForm from '../../components/PayForm/PayForm';
import classNames from 'classnames';
import { cashOut, changeProfileModeView, clearPaymentStore } from '../../actions/actionCreator';
import Error from '../../components/Error/Error';
import Events from '../../components/Events';
import NotificationBadge from '../../components/NotificationBadge';

const UserProfile = (props) => {
  useEffect(() => {
    document.title = 'Account | Squadhelp';
  });

  const pay = (values) => {
    const { number, expiry, cvc, sum } = values;
    props.cashOut({ number, expiry, cvc, sum });
  };

  const {
    user: { balance, role },
    profileModeView,
    changeProfileModeView,
    error,
    clearPaymentStore,
  } = props;
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <div className={styles.optionsContainer}>
            <div
              className={classNames(styles.optionContainer, {
                [styles.currentOption]: profileModeView === CONSTANTS.USER_INFO_MODE,
              })}
              onClick={() => changeProfileModeView(CONSTANTS.USER_INFO_MODE)}>
              UserInfo
            </div>
            <div
              className={classNames(styles.optionContainer, {
                [styles.currentOption]: profileModeView === CONSTANTS.EVENTS,
              })}
              onClick={() => changeProfileModeView(CONSTANTS.EVENTS)}>
              Events
              <NotificationBadge />
            </div>
            {role === CONSTANTS.CREATOR && (
              <div
                className={classNames(styles.optionContainer, {
                  [styles.currentOption]: profileModeView === CONSTANTS.CASHOUT_MODE,
                })}
                onClick={() => changeProfileModeView(CONSTANTS.CASHOUT_MODE)}>
                Cashout
              </div>
            )}
          </div>
        </div>
        {profileModeView === CONSTANTS.USER_INFO_MODE && <UserInfo />}
        {profileModeView === CONSTANTS.EVENTS && <Events />}
        {profileModeView === CONSTANTS.CASHOUT_MODE && (
          <div className={styles.container}>
            {parseInt(balance) === 0 ? (
              <span className={styles.notMoney}>There is no money on your balance</span>
            ) : (
              <div>
                {error && (
                  <Error data={error.data} status={error.status} clearError={clearPaymentStore} />
                )}
                <PayForm sendRequest={pay} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const user = state.auth.user;
  const { profileModeView } = state.userProfile;
  const { error } = state.payment;
  return { profileModeView, error, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cashOut: (data) => dispatch(cashOut(data)),
    changeProfileModeView: (data) => dispatch(changeProfileModeView(data)),
    clearPaymentStore: () => dispatch(clearPaymentStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
