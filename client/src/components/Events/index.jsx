import React, { useEffect, useState } from 'react';
import { addDays, formatDistanceToNowStrict } from 'date-fns';
import styles from './events.module.sass';

function Events() {
  const addRemainingTime = (arr) => {
    const tempArr = arr;
    if (tempArr) {
      tempArr.forEach((e) => {
        if (Date.now() < new Date(e.end).getTime()) {
          let result = 'Error';
          if (
            formatDistanceToNowStrict(new Date(e.end), { roundingMethod: 'floor' }).search(
              'year',
            ) !== -1
          ) {
            const tempMonth = formatDistanceToNowStrict(
              new Date(e.end).setFullYear(new Date().getFullYear()),
              {
                unit: 'month',
                roundingMethod: 'round',
              },
            );
            result = `
              ${formatDistanceToNowStrict(new Date(e.end), {
                unit: 'year',
                roundingMethod: 'floor',
              })} ${tempMonth[0] !== 0 ? tempMonth : ''}`;
          } else if (
            formatDistanceToNowStrict(new Date(e.end), { roundingMethod: 'floor' }).search(
              'month',
            ) !== -1
          ) {
            result = `
              ${formatDistanceToNowStrict(new Date(e.end), {
                unit: 'month',
                roundingMethod: 'floor',
              })} ${
              Math.abs(+new Date(e.end).getDate() - +new Date().getDate()) !== 0
                ? Math.abs(+new Date(e.end).getDate() - +new Date().getDate()) + 'd'
                : ''
            }`;
          } else if (
            formatDistanceToNowStrict(new Date(e.end), { roundingMethod: 'floor' }).search(
              'day',
            ) !== -1
          ) {
            const tempHour = formatDistanceToNowStrict(
              new Date(e.end).setFullYear(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 1,
              ),
              {
                unit: 'hour',
                roundingMethod: 'round',
              },
            );
            result = `
              ${formatDistanceToNowStrict(new Date(e.end), {
                unit: 'day',
                roundingMethod: 'floor',
              })} ${tempHour[0] !== 0 ? tempHour : ''}`;
          } else if (
            formatDistanceToNowStrict(new Date(e.end), { roundingMethod: 'floor' }).search(
              'hour',
            ) !== -1
          ) {
            result =
              formatDistanceToNowStrict(new Date(e.end), {
                unit: 'hour',
                roundingMethod: 'floor',
              }) +
              ' ' +
              Math.ceil(((new Date(e.end).getTime() - Date.now()) % 3600000) / 60000) +
              'm';
          } else if (
            formatDistanceToNowStrict(new Date(e.end), { roundingMethod: 'floor' }).search(
              'minute',
            ) !== -1
          ) {
            result =
              formatDistanceToNowStrict(new Date(e.end), {
                unit: 'minute',
                roundingMethod: 'floor',
              }) +
              ' ' +
              Math.ceil(((new Date(e.end).getTime() - Date.now()) % 60000) / 1000) +
              's';
          } else {
            result = formatDistanceToNowStrict(new Date(e.end), {
              unit: 'second',
            });
          }
          e.remaining = result;
        }
      });
    }
    return tempArr;
  };

  const [events, setEvents] = useState(
    addRemainingTime(JSON.parse(localStorage.getItem('events'))),
  );

  useEffect(() => {
    if (!localStorage.getItem('events')) {
      localStorage.setItem('events', JSON.stringify([]));
    }
    let intervalId;
    if (events) {
      for (const e of events) {
        if (Date.now() < new Date(e.end).getTime() && !intervalId) {
          intervalId = setInterval(
            () => setEvents(addRemainingTime(JSON.parse(localStorage.getItem('events')))),
            1000,
          );
        } else if (Date.now() >= new Date(e.end).getTime() && intervalId) {
          clearInterval(intervalId);
        }
      }
    }

    return () => {
      clearInterval(intervalId);
    };
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
    addEvent(prompt('Name', '123') || 'test', addDays(new Date(), 43));
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
            <p>Remaining result</p>
            <i className={'far fa-clock'} />
          </div>
        </div>
        <div className={styles.eventsContainer}>
          {events?.length > 0 ? (
            events
              .sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime())
              .map((e, index) => (
                <div className={styles.event} key={index}>
                  <p className={styles.eventName} title={'Event name'}>
                    {e.name}
                  </p>
                  <p className={styles.remainingTime} title={'Remaining time'}>
                    {Date.now() < new Date(e.end).getTime() ? (
                      e.remaining
                    ) : (
                      <>
                        <button
                          className={styles.done}
                          title={'Mark as Done!'}
                          onClick={() => {
                            const tempArr = events;
                            tempArr.splice(index, 1);
                            setEvents([...tempArr]);
                            if (tempArr) {
                              tempArr.forEach((e) => delete e.remaining);
                            }
                            localStorage.setItem('events', JSON.stringify(tempArr));
                          }}>
                          <i className={'fas fa-check'} />
                          Done
                        </button>
                        Alert
                      </>
                    )}
                  </p>
                  {/* <div className={styles.progress} /> */}
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
