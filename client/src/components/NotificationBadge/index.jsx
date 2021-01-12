import React, { useEffect, useState } from 'react';
import styles from './notificationBadge.module.sass';

function NotificationBadge() {
  const [count, setCount] = useState(0);

  const addFinished = (arr) => {
    const tempArr = [...arr];
    setCount(0);
    tempArr.forEach((e) => {
      if (new Date(e.end).getTime() <= Date.now() && !e.isFinished) {
        e.isFinished = true;
        setCount((c) => c + 1);
      } else if (new Date(e.end).getTime() > Date.now()) {
        e.isFinished = false;
      }
    });
    return tempArr;
  };
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')));

  useEffect(() => {
    let intervalId;
    if (events) {
      if (!intervalId) {
        intervalId = setInterval(() => {
          events.forEach((e) => {
            if (new Date(e.end).getTime() <= Date.now() && !e.isFinished) {
              setEvents([...addFinished(JSON.parse(localStorage.getItem('events')))]);
            } else if (JSON.parse(localStorage.getItem('events')).length !== events.length) {
              setEvents([...addFinished(JSON.parse(localStorage.getItem('events')))]);
            }
          });
        }, 1000);
      }
    } else {
      setCount(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [events]);

  return count ? <div className={styles.badge}>{count}</div> : null;
}

export default NotificationBadge;
