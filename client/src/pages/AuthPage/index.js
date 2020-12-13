import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { loginRequest, signUpRequest } from '../../actions/authActionCreators';
import SignInForm from '../../components/forms/SignInForm';
import SignUpForm from '../../components/forms/SignUpForm';
import { userSelector } from '../../selectors';

function AuthPage() {
  const [isLogin, setIsLogin] = useState();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  useLayoutEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const Form = isLogin ? SignInForm : SignUpForm;

  const handleSubmit = useCallback(
    values => {
      dispatch(isLogin ? loginRequest(values) : signUpRequest(values));
    },
    [isLogin]
  );

  if (user) {
    return <Redirect to={'/'} />;
  }

  return (
    <>
      <Link to="/">SQUADHELP</Link>
      <Link to={isLogin ? '/signup' : '/login'}>
        {isLogin ? 'SIGN UP' : 'LOGIN'}
      </Link>
      <Form onSubmit={handleSubmit} />
    </>
  );
}

export default AuthPage;
