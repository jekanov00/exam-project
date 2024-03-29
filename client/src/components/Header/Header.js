import React, { useCallback } from 'react';
import styles from './Header.module.sass';
import { Link } from 'react-router-dom';
import CONSTANTS, { ROLES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../actions/authActionCreators';
import { authSelector } from '../../selectors';
import NotificationBadge from '../NotificationBadge';

function Header() {
  const { isFetching, user } = useSelector(authSelector);

  const dispatch = useDispatch();

  const logoutAction = useCallback(() => void dispatch(logoutRequest()), [dispatch]);

  const renderLoginButtons = () => {
    if (user) {
      return (
        <>
          <div className={styles.userInfo} style={{ position: 'relative' }}>
            <img
              src={
                user.avatar === null
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${user.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${user.displayName}`}</span>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
            <NotificationBadge simple={true} />
            <ul>
              <li>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li style={{ position: 'relative' }}>
                <Link to="/account" style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
                <NotificationBadge />
              </li>
              {user?.role === ROLES.MODERATOR && (
                <li>
                  <Link to="/offers-table" style={{ textDecoration: 'none' }}>
                    <span>Offers</span>
                  </Link>
                </li>
              )}
              <li>
                <Link to="https://www.google.com" style={{ textDecoration: 'none' }}>
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="https://www.google.com" style={{ textDecoration: 'none' }}>
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <span onClick={logoutAction}>Logout</span>
              </li>
            </ul>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>LOGIN</span>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>SIGN UP</span>
          </Link>
        </>
      );
    }
  };

  if (isFetching) {
    return null;
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <span>(877)&nbsp;355-3585</span>
        </div>
        <div className={styles.userButtonsContainer}>{renderLoginButtons()}</div>
      </div>
      <div className={styles.navContainer}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
        </Link>
        <div className={styles.leftNav}>
          <div className={styles.nav}>
            <ul>
              <li>
                <span>NAME IDEAS</span>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                <ul>
                  <li>
                    <a href="http://www.google.com">Beauty</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Consulting</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">E-Commerce</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Fashion & Clothing</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Finance</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Real Estate</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">Tech</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">More Categories</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>CONTESTS</span>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                <ul>
                  <li>
                    <Link to={'/howitworks'}>HOW IT WORKS</Link>
                  </li>
                  <li>
                    <a href="http://www.google.com">PRICING</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">AGENCY SERVICE</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">ACTIVE CONTESTS</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">WINNERS</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">LEADERBOARD</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">BECOME A CREATIVE</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Work</span>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                <ul>
                  <li>
                    <a href="http://www.google.com">NAMES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">TAGLINES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">LOGOS</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">TESTIMONIALS</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Names For Sale</span>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                <ul>
                  <li>
                    <a href="http://www.google.com">POPULAR NAMES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">SHORT NAMES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">INTRIGUING NAMES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">NAMES BY CATEGORY</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">VISUAL NAME SEARCH</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">SELL YOUR DOMAINS</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Blog</span>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                <ul>
                  <li>
                    <a target="_blank" rel="noreferrer" href="http://www.google.com">
                      ULTIMATE NAMING GUIDE
                    </a>
                  </li>
                  <li>
                    <a href="http://www.google.com">POETIC DEVICES IN BUSINESS NAMING</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">CROWDED BAR THEORY</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">ALL ARTICLES</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {user && user.role === ROLES.CUSTOMER && (
            <Link className={styles.startContestBtn} to="/startContest">
              START CONTEST
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
