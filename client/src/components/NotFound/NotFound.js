import React, { useEffect } from 'react';
import styles from './NotFound.module.sass';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Not Found | Squadhelp';
  });
  return (
    <div className={styles.container}>
      <span>Not Found</span>
    </div>
  );
};

export default NotFound;
