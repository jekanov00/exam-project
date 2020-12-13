import React, { useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ROLES } from './../../../constants';

const initialValues = {
  firstName: 'Test',
  lastName: 'Testovich',
  displayName: 'teset' + Date.now(),
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
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Field name="firstName" />
          <ErrorMessage name="firstName" />
          <br />
          <Field name="lastName" />
          <ErrorMessage name="lastName" />
          <br />
          <Field name="displayName" />
          <ErrorMessage name="firstName" />
          <br />
          <Field name="email" />
          <ErrorMessage name="email" />
          <br />
          <Field name="password" />
          <ErrorMessage name="password" />
          <br />
          <Field name="confirmPassword" />
          <ErrorMessage name="confirmPassword" />
          <br />
          {roles.map(r => (
            <Fragment key={r}>
              <label>
                <Field name="role" type="radio" value={r} />
                <span>{r}</span>
              </label>
              <br />
            </Fragment>
          ))}
          <ErrorMessage name="role" />
          <br />
          <button type="submit">Sign Up</button>
        </Form>
      )}
    </Formik>
  );
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
