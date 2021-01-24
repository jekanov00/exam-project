import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './ForgotForm.module.sass';

const initialValues = {
  email: '',
  newPassword: '',
};

const validationSchema = Yup.object({
  email: Yup.string().trim().email().required(),
  newPassword: Yup.string().required(),
});

function ForgotForm(props) {
  const { onSubmit } = props;

  const handleSubmit = useCallback(
    (values, formikBag) => {
      onSubmit(values);
    },
    [onSubmit],
  );

  return (
    <div className={styles.forgotForm}>
      <h2>RESTORE PASSWORD</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ submitting }) => (
          <Form>
            <div className={styles.inputContainer}>
              <Field
                name="email"
                type="email"
                placeholder="Email address"
                className={styles.input}
              />
              <ErrorMessage name="email" className={styles.error} />
            </div>
            <div className={styles.inputContainer}>
              <Field
                name="newPassword"
                type="password"
                placeholder="New Password"
                className={styles.input}
              />
              <ErrorMessage name="newPassword" className={styles.error} />
            </div>

            <button type="submit" className={styles.submitContainer} disabled={submitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

ForgotForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ForgotForm;
