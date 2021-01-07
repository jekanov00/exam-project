import React, { useEffect, useState } from 'react';
import { formatDistanceToNowStrict, addDays, parseISO } from 'date-fns';
import styles from './events.module.sass';

function Events() {
  useEffect(() => {
    if (!localStorage.getItem('events')) {
      localStorage.setItem('events', JSON.stringify([]));
    }
  });

  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')));

  const parseEvents = () => {
    setEvents(JSON.parse(localStorage.getItem('events')));
  };

  const addEvent = (name, date) => {
    const localEvents = JSON.parse(localStorage.getItem('events'));

    localEvents.push({
      name,
      start: new Date(),
      end: date,
    });
    localStorage.setItem('events', JSON.stringify(localEvents));

    parseEvents();
  };

  const handleEvent = () => {
    addEvent('test', addDays(new Date(), 5));
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingContainer}>
            <h1 className={styles.heading}>Live upcomming checks</h1>
            <button className={styles.addEvent} onClick={handleEvent}>
              +
            </button>
          </div>
          <div className={styles.remainingHeading}>
            <p>Remaining time</p>
            <i className={'far fa-clock'} />
          </div>
        </div>
        <div className={styles.eventsContainer}>
          {events.length ? (
            events.map((e, index) => (
              <div className={styles.event} key={index}>
                <p className={styles.eventName}>{e.name}</p>
                <p className={styles.remainingTime}>{formatDistanceToNowStrict(parseISO(e.end))}</p>
              </div>
            ))
          ) : (
            <p className={styles.noEvents}>No Events</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Events;
