import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './SignInForm.module.sass';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().trim().email().required(),
  password: Yup.string().required(),
});

function SignInForm(props) {
  const { onSubmit } = props;

  const handleSubmit = useCallback(
    (values, formikBag) => {
      onSubmit(values);
    },
    [onSubmit]
  );

  return (
    <div className={styles.loginForm}>
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {() => (
          <Form>
            <div className={styles.inputContainer}>
              <Field name="email" type="email" placeholder="Email address" className={styles.input} />
              <ErrorMessage name="email" className={styles.error} />
            </div>
            <div className={styles.inputContainer}>
              <Field name="password" type="password" placeholder="Password" className={styles.input} />
              <ErrorMessage name="password" className={styles.error} />
            </div>

            <button type="submit" className={styles.submitContainer}>
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
