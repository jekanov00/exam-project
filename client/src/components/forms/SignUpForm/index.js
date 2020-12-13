import React, { useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ROLES } from './../../../constants';
import styles from './SignUpForm.module.sass';

const initialValues = {
  firstName: 'Test',
  lastName: 'Testovich',
  displayName: 'test' + Date.now(),
  email: `test${Date.now()}@gmail.com`,
  password: 'Test12345',
  confirmPassword: 'Test12345',
  role: ROLES.CUSTOMER,
};

const passwordRule = [
  /(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])^.{8,255}$/,
  'Your password must be at least 8 characters, and include at least one lowercase letter, one uppercase letter, and a number. ',
];

const roles = Object.values(ROLES);

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required(),
  lastName: Yup.string().trim().required(),
  displayName: Yup.string().trim().required(),
  email: Yup.string().trim().email().required(),
  password: Yup.string()
    .matches(...passwordRule)
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required(),
  role: Yup.string().oneOf(roles).required(),
});

function SignUpForm(props) {
  const { onSubmit } = props;

  const handleSubmit = useCallback(
    (values, formikBag) => {
      onSubmit(values);
    },
    [onSubmit]
  );

  return (
    <div className={styles.signUpFormContainer}>
      <div className={styles.headerFormContainer}>
        <h2>CREATE AN ACCOUNT</h2>
        <h4>We always keep your name and email address private.</h4>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {() => (
          <Form>
            <div className={styles.row}>
              <div className={styles.inputContainer}>
                <Field name="firstName" placeholder="First name" className={styles.input} />
                <ErrorMessage name="firstName" />
              </div>
              <div className={styles.inputContainer}>
                <Field name="lastName" placeholder="Last name" className={styles.input} />
                <ErrorMessage name="lastName" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputContainer}>
                <Field name="displayName" placeholder="Display name" className={styles.input} />
                <ErrorMessage name="firstName" />
              </div>
              <div className={styles.inputContainer}>
                <Field name="email" placeholder="Email address" className={styles.input} />
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputContainer}>
                <Field name="password" placeholder="Password" className={styles.input} />
                <ErrorMessage name="password" />
              </div>
              <div className={styles.inputContainer}>
                <Field name="confirmPassword" placeholder="Password confirmation" className={styles.input} />
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>
            <div className={styles.choseRoleContainer}>
              <div className={styles.roleContainer}>
                <Field name="role" type="radio" value={ROLES.CUSTOMER} id={ROLES.CUSTOMER} />
                <div className={styles.infoRoleContainer}>
                  <span className={styles.role}>Join As a Buyer</span>
                  <span className={styles.infoRole}>I am looking for a Name, Logo or Tagline for my business, brand or product.</span>
                </div>
              </div>
              <div className={styles.roleContainer}>
                <Field name="role" type="radio" value={ROLES.CREATOR} id={ROLES.CREATOR} />
                <div className={styles.infoRoleContainer}>
                  <span className={styles.role}>Join As a Creative</span>
                  <span className={styles.infoRole}>I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.</span>
                </div>
              </div>
              <ErrorMessage name="role" />
            </div>
            {/* <div className={styles.termsOfService}>
              <Field
                name="agreeOfTerms"
                id="termsOfService"
                component={AgreeTermOfServiceInput}
                type="checkbox"
              />
            </div> */}
            <button type="submit" className={styles.submitContainer}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
