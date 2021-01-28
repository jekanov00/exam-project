import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  clearContestList,
  setNewCustomerFilter,
  getContestsForModerator,
} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import ContestsContainer from '../../components/ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import classNames from 'classnames';
import TryAgain from '../../components/TryAgain/TryAgain';
import styles from './ModeratorDashboard.module.sass';

class ModeratorDashboard extends Component {
  componentDidMount() {
    this.props.clearContestsList();
    this.props.newFilter(CONSTANTS.CONTEST_STATUS_PENDING);
    this.getContests();
  }

  loadMore = (startFrom) => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: this.props.customerFilter,
    });
  };

  getContests = () => {
    this.props.getContests({
      limit: 8,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.customerFilter !== prevProps.customerFilter) {
      this.getContests();
    }
  }

  goToExtended = (contest_id) => {
    this.props.history.push('/contest/' + contest_id);
  };

  setContestList = () => {
    const array = [];
    const { contests } = this.props;
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox data={contests[i]} key={contests[i].id} goToExtended={this.goToExtended} />,
      );
    }
    return array;
  };

  componentWillUnmount() {
    this.props.clearContestsList();
  }

  tryToGetContest = () => {
    this.props.clearContestsList();
    this.getContests();
  };

  render() {
    const { error, haveMore } = this.props;
    const { customerFilter } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div
            onClick={() => this.props.newFilter(CONSTANTS.CONTEST_STATUS_PENDING)}
            className={classNames({
              [styles.activeFilter]: CONSTANTS.CONTEST_STATUS_PENDING === customerFilter,
              [styles.filter]: CONSTANTS.CONTEST_STATUS_PENDING !== customerFilter,
            })}>
            Pending Contests
          </div>
          <div
            onClick={() => this.props.newFilter(CONSTANTS.CONTEST_STATUS_ACTIVE)}
            className={classNames({
              [styles.activeFilter]: CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
              [styles.filter]: CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
            })}>
            Active Contests
          </div>
          <div
            onClick={() => this.props.newFilter(CONSTANTS.CONTEST_STATUS_FINISHED)}
            className={classNames({
              [styles.activeFilter]: CONSTANTS.CONTEST_STATUS_FINISHED === customerFilter,
              [styles.filter]: CONSTANTS.CONTEST_STATUS_FINISHED !== customerFilter,
            })}>
            Completed Contests
          </div>
        </div>
        <div className={styles.contestsContainer}>
          {error ? (
            <TryAgain getData={this.tryToGetContest()} />
          ) : (
            <ContestsContainer
              isFetching={this.props.isFetching}
              loadMore={this.loadMore}
              history={this.props.history}
              haveMore={haveMore}>
              {this.setContestList()}
            </ContestsContainer>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.contestsList;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContests: (data) => dispatch(getContestsForModerator(data)),
    clearContestsList: () => dispatch(clearContestList()),
    newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
