import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../browserHistory';
import Header from '../../components/Header/Header';
import { ROLES } from '../../constants';
import {
  getModeratorOffers,
  acceptOfferBundle,
  deleteOfferBundle,
} from '../../actions/actionCreator';
import Spinner from '../../components/Spinner/Spinner';
import styles from './OffersTable.module.sass';

function OffersTable(props) {
  const { user, getModeratorOffers: getOffers } = props;
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    document.title = 'Offers | Squadhelp';

    if (user.role !== ROLES.MODERATOR) {
      history.push('/');
    }

    getOffers({ user, page: pageNumber });
  }, [user, getOffers, pageNumber]);

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
                      <button
                        className={styles.acceptBtn}
                        onClick={() => props.acceptOfferBundle(e)}>
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
        {!isFetching && (
          <tfoot className={styles.pageInfo}>
            <tr>
              {!isFetching && (
                <td className={styles.pageInfo_td}>{`${bundle?.pageStart + 1} - ${
                  bundle?.pageEnd + 1
                }, from ${bundle?.overallCount}`}</td>
              )}
            </tr>
          </tfoot>
        )}
      </table>
      <div className={styles.pageContainer}>
        <button
          disabled={pageNumber === 1}
          onClick={() => {
            setPageNumber(1);
            return getOffers({ user, page: 1 });
          }}>
          {'<<'}
        </button>
        <button
          disabled={pageNumber === 1}
          onClick={() => {
            setPageNumber(pageNumber - 1);
            return getOffers({ user, page: pageNumber - 1 });
          }}>
          {'<'}
        </button>
        <div className={styles.pageNumber}>{pageNumber}</div>
        <button
          disabled={pageNumber === Math.ceil(bundle?.overallCount / 10)}
          onClick={() => {
            setPageNumber(pageNumber + 1);
            return getOffers({ user, page: pageNumber + 1 });
          }}>
          {'>'}
        </button>
        <button
          disabled={pageNumber === Math.ceil(bundle?.overallCount / 10)}
          onClick={() => {
            setPageNumber(Math.ceil(bundle.overallCount / 10));
            return getOffers({ user, page: Math.ceil(bundle.overallCount / 10) });
          }}>
          {'>>'}
        </button>
      </div>
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
