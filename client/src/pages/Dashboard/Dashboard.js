import React, { useEffect } from 'react';
import { ROLES } from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';

const Dashboard = (props) => {
  const { role, history } = props;

  useEffect(() => {
    document.title = 'Dashboard';
  });

  return (
    <div>
      <Header />
      {role === ROLES.CUSTOMER ? (
        <CustomerDashboard history={history} match={props.match} />
      ) : (
        <CreatorDashboard history={history} match={props.match} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.auth.user;
};

export default connect(mapStateToProps)(Dashboard);
