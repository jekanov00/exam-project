import React, { useEffect, useState } from 'react';
import { formatDistanceToNowStrict, addMinutes } from 'date-fns';
import styles from './events.module.sass';

function Events() {
  const addRemainingTime = (arr) => {
    const tempArr = arr;
    tempArr.forEach((e) => (e.remaining = formatDistanceToNowStrict(new Date(e.end))));
    return tempArr;
  }

  const [events, setEvents] = useState(addRemainingTime(JSON.parse(localStorage.getItem('events'))));

  useEffect(() => {
    if (!localStorage.getItem('events')) {
      localStorage.setItem('events', JSON.stringify([]));
    }

    let intervalId;
    for (const e of events) {
      if(new Date().getTime() < new Date(e.end).getTime() && !intervalId){
        intervalId = setInterval(()=>setEvents(addRemainingTime(JSON.parse(localStorage.getItem('events')))), 1000);
      } else if(new Date().getTime() >= new Date(e.end).getTime() && intervalId) {
        clearInterval(intervalId);
      }
    }

    return ()=>{
      clearInterval(intervalId);
    }
  }, [events]);

  const addEvent = (name, date) => {
    const localEvents = JSON.parse(localStorage.getItem('events'));
    localEvents.push({
      name,
      start: new Date(),
      end: date,
    });
    setEvents(addRemainingTime(localEvents));
    localStorage.setItem('events', JSON.stringify(localEvents));
  };

  const handleEvent = () => {
    addEvent(prompt('Name', '123') || 'test', addMinutes(new Date(), 5));
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingContainer}>
            <h1 className={styles.heading}>Live upcomming checks</h1>
            <button className={styles.addEvent} title={'Add event'} onClick={handleEvent}>
              +
            </button>
          </div>
          <div className={styles.remainingHeading}>
            <p>Remaining time</p>
            <i className={'far fa-clock'} />
          </div>
        </div>
        <div className={styles.eventsContainer}>
          {events?.length > 0 ? (
            events
              .sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime())
              .map((e, index) => (
                <div className={styles.event} key={index}>
                  <p className={styles.eventName}>{e.name}</p>
                  <p className={styles.remainingTime}>
                    {new Date().getTime() < new Date(e.end).getTime() ? e.remaining : 'Alert'}
                  </p>
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
