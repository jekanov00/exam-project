import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../browserHistory';
import Header from '../../components/Header/Header';
import { ROLES } from '../../constants';
import { getModeratorOffers, acceptOfferBundle, deleteOfferBundle } from '../../actions/actionCreator';
import Spinner from '../../components/Spinner/Spinner';
import styles from './OffersTable.module.sass';

function OffersTable(props) {
  const { user, getModeratorOffers: getOffers } = props;

  useEffect(() => {
    document.title = 'Offers | Squadhelp';

    if (user.role !== ROLES.MODERATOR) {
      history.push('/');
    }

    getOffers(user);
  }, [user, getOffers]);

  const { error, isFetching, bundle } = props.bundleStore;

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
            <th>Offer creator</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {error && (
            <tr>
              <td className={styles.error}>{error.message}</td>
            </tr>
          )}
          {isFetching ? (
            <tr>
              <td style={{ flexGrow: 1 }}>
                <Spinner />
              </td>
            </tr>
          ) : (
            bundle?.offers.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.id}</td>
                  <td>{e.text}</td>
                  <td
                    style={
                      e.status === 'active'
                        ? { color: '#777777' }
                        : e.status === 'won'
                        ? { color: 'green' }
                        : e.status === 'rejected'
                        ? { color: 'red' }
                        : {}
                    }>
                    {e.status}
                  </td>
                  <td>{e.contestId}</td>
                  <td>{`${e.User.firstName} ${e.User.lastName}`}</td>
                  <td>
                    {e.status === 'pending' && (
                      <button className={styles.acceptBtn} onClick={() => props.acceptOfferBundle(e)}>
                        Accept
                      </button>
                    )}
                    <button className={styles.deleteBtn} onClick={() => props.deleteOfferBundle(e)}>
                      <i className={'far fa-trash-alt'} />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const bundleStore = state.bundleStore;
  return { user, bundleStore };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getModeratorOffers: (data) => dispatch(getModeratorOffers(data)),
    acceptOfferBundle: (data) => dispatch(acceptOfferBundle(data)),
    deleteOfferBundle: (data) => dispatch(deleteOfferBundle(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersTable);
