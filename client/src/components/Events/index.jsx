import React, { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import styles from './events.module.sass';
import EventForm from '../forms/EventForm';

function Events() {
  /**
   *
   * @param {Array.<Object>} arr
   * @returns {Array.<Object>}
   */
  const addRemainingTime = (arr) => {
    const tempArr = [...arr];
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
            const tempMonths = formatDistanceToNowStrict(new Date(e.end), {
              unit: 'month',
              roundingMethod: 'floor',
            });
            result = `
              ${tempMonths} ${
              Math.abs(+new Date(e.end).getDate() - +new Date().getDate()) !== 0 &&
              tempMonths[0] + tempMonths[1] !== '12'
                ? new Date(
                    new Date(e.end).setFullYear(new Date().getFullYear(), new Date().getMonth()),
                  ).getDate() < new Date().getDate()
                  ? formatDistanceToNowStrict(
                      new Date(e.end).setFullYear(
                        new Date().getFullYear(),
                        new Date().getMonth() + 1,
                      ),
                      {
                        unit: 'day',
                        roundingMethod: 'round',
                      },
                    )
                  : formatDistanceToNowStrict(
                      new Date(e.end).setFullYear(new Date().getFullYear(), new Date().getMonth()),
                      {
                        unit: 'day',
                        roundingMethod: 'round',
                      },
                    )
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
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  /**
   *
   * @param {string} name
   * @param {Date} date
   */
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
    setIsFormOpen(true);
  };

  const handleSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    if (new Date(values.endDate + ' ' + values.endTime) >= new Date()) {
      addEvent(values.title, new Date(values.endDate + ' ' + values.endTime));
      setIsFormOpen(false);
    } else {
      return 'Provided date/time cannot be earlier than the current time!';
    }
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingContainer}>
            <h1 className={styles.heading}>Live upcomming checks</h1>
            <div className={styles.addEventContainer}>
              <button className={styles.addEvent} title={'Add event'} onClick={handleEvent}>
                +
              </button>
              {isFormOpen ? <EventForm onSubmit={handleSubmit} onCancel={setIsFormOpen} /> : ''}
            </div>
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
                  <p className={styles.eventName} title={'Event title'}>
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
