import React from 'react';
import styles from './OfferBox.module.sass';
import CONSTANTS, { ROLES } from '../../constants';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import {
  changeMark,
  clearChangeMarkError,
  goToExpandedDialog,
  changeShowImage,
  acceptOffer,
  deleteOffer,
} from '../../actions/actionCreator';
import { withRouter } from 'react-router-dom';
import { isEqual } from 'lodash';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';

const OfferBox = (props) => {
  const findConversationInfo = () => {
    const { messagesPreview, id } = props;
    const participants = [id, props.data.User.id];
    participants.sort((participant1, participant2) => participant1 - participant2);
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          id: messagesPreview[i].id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const resolveOffer = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(props.data.User.id, props.data.id, 'resolve'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(props.data.User.id, props.data.id, 'reject'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const changeMark = (value) => {
    props.clearError();
    props.changeMark({
      mark: value,
      offerId: props.data.id,
      isFirst: !props.data.mark,
      creatorId: props.data.User.id,
    });
  };

  const offerStatus = () => {
    const { status } = props.data;
    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return <i className={classNames('fas fa-times-circle reject', styles.reject)} />;
    } else if (status === CONSTANTS.OFFER_STATUS_WON) {
      return <i className={classNames('fas fa-check-circle resolve', styles.resolve)} />;
    }
    return null;
  };

  const goChat = () => {
    props.goToExpandedDialog({
      interlocutor: props.data.User,
      conversationData: findConversationInfo(),
    });
  };

  const { data, role, id, contestType } = props;
  const { avatar, firstName, lastName, email, rating } = data.User;
  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={
                avatar === (null && undefined)
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${avatar}`
              }
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{firstName + ' ' + lastName}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`} alt="star-outline" />
              }
              readonly={true}
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {contestType === CONSTANTS.LOGO_CONTEST ? (
            <img
              onClick={() =>
                props.changeShowImage({
                  imagePath: data.fileName,
                  isShowOnFull: true,
                })
              }
              className={styles.responseLogo}
              src={`${CONSTANTS.publicURL}${data.fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.response}>{data.text}</span>
          )}
          {data.User.id !== id && role !== ROLES.MODERATOR && (
            <Rating
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`} alt="star" />
              }
              onClick={changeMark}
              placeholderRating={data.mark}
            />
          )}
        </div>
        {role !== CONSTANTS.CREATOR && <i onClick={goChat} className="fas fa-comments" />}
      </div>
      {props.needButtons(data.status) && (
        <div className={styles.btnsContainer}>
          <div onClick={resolveOffer} className={styles.resolveBtn}>
            Resolve
          </div>
          <div onClick={rejectOffer} className={styles.rejectBtn}>
            Reject
          </div>
        </div>
      )}
      {role === ROLES.MODERATOR && data.status === CONSTANTS.OFFER_STATUS_PENDING && (
        <div className={styles.offerModeration}>
          <button className={styles.acceptBtn} onClick={() => props.acceptOffer(data)}>
            Accept
          </button>
          <button className={styles.deleteBtn} onClick={() => props.deleteOffer(data)}>
            <i className={'far fa-trash-alt'} />
          </button>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeMark: (data) => dispatch(changeMark(data)),
    clearError: () => dispatch(clearChangeMarkError()),
    goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
    changeShowImage: (data) => dispatch(changeShowImage(data)),
    acceptOffer: (data) => dispatch(acceptOffer(data)),
    deleteOffer: (data) => dispatch(deleteOffer(data)),
  };
};

const mapStateToProps = (state) => {
  const { changeMarkError, isShowModal } = state.contestByIdStore;
  const { id, role } = state.auth.user;
  const { messagesPreview } = state.chatStore;
  return { changeMarkError, id, role, messagesPreview, isShowModal };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferBox));
