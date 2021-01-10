import React, { useCallback, useState } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import styles from './eventForm.module.sass';

const formSchema = yup.object().shape({
  title: yup.string().required('Title is required!'),
  endDate: yup.string().required(),
  endTime: yup.string().required(),
});

function EventForm(props) {
  const { onSubmit, onCancel } = props;
  const [formError, setFormError] = useState(null);

  const handleSubmit = useCallback(
    async (values, formikBag) => {
      const res = await onSubmit(values);
      if (res) {
        setFormError(res);
      }
    },
    [onSubmit],
  );

  return (
    <div className={styles.addEventForm}>
      <h2 className={styles.formHeader}>Add event</h2>
      <Formik
        initialValues={{
          title: '',
          endDate: format(new Date(), 'yyyy-MM-dd'),
          endTime: format(new Date(), 'HH:mm'),
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.inputContainer}>
              <Field
                id={'title'}
                name={'title'}
                placeholder={'Title'}
                className={styles.titleField}
              />
              <ErrorMessage name={'title'} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor={'endDate'}>End Date</label>
              <Field
                id={'endDate'}
                name={'endDate'}
                type={'date'}
                min={format(new Date(), 'yyyy-MM-dd')}
                className={styles.endDate}
              />
              <ErrorMessage name={'endDate'} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor={'endTime'}>End Time</label>
              <Field id={'endTime'} name={'endTime'} type={'time'} className={styles.endDate} />
              <ErrorMessage name={'endTime'} />
              {formError ? formError : ''}
            </div>
            <div className={styles.formButtonContainer}>
              <button
                className={styles.cancel}
                onClick={() => {
                  onCancel(false);
                }}>
                Cancel
              </button>
              <button type={'submit'} className={styles.submit} disabled={isSubmitting}>
                OK
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EventForm;
