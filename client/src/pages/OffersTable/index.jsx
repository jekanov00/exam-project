import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../browserHistory';
import Header from '../../components/Header/Header';
import { ROLES } from '../../constants';
import styles from './OffersTable.module.sass';

function OffersTable(props) {
  useEffect(() => {
    document.title = 'Offers | Squadhelp';

    if (props.user.role !== ROLES.MODERATOR) {
      history.push('/');
    }
  });

  return (
    <div>
      <Header />
      <table className={styles.offersTable}>
        <thead>
          <tr>
            <th>id</th>
            <th>Content</th>
            <th>Status</th>
            <th>Contest id</th>
            <th>Contest creator</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>Test</td>
            <td>pending</td>
            <td>5</td>
            <td>test testovich</td>
            <td>test</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersTable);
