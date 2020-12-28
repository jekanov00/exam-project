import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';

class Footer extends Component {
  topFooterItemsRender = (item) => {
    return (
      <div key={item.title}>
        <h4>{item.title}</h4>
        {item.items.map((i) => {
          if (i !== 'How It Works?') {
            return (
              <a key={i} href="https://google.com">
                {i}
              </a>
            );
          } else {
            return <Link to={'/howitworks'}>{i}</Link>;
          }
        })}
      </div>
    );
  };

  topFooterRender() {
    return CONSTANTS.FooterItems.map((item) => this.topFooterItemsRender(item));
  }

  render() {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div>{this.topFooterRender()}</div>
        </div>
      </div>
    );
  }
}

export default Footer;
