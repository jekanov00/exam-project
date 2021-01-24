import React, { useLayoutEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import HowItWorks from './pages/HowItWorks';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS, { REFRESH_TOKEN_KEY } from './constants';
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Spinner/Spinner';
import { refreshAuthRequest } from './actions/authActionCreators';
import ForgotPassword from './pages/ForgotPassword';
import RestorePasswordSuccess from './pages/RestorePasswordSuccess';
import EmailSent from './pages/EmailSent';

const AuthPage = lazy(() => import('./pages/AuthPage'));

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
      dispatch(
        refreshAuthRequest({
          refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
        }),
      );
    }
  });

  return (
    <Router history={browserHistory}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path={['/login', '/signup']} component={AuthPage} />
          <Route path={'/forgot-password'} exact component={ForgotPassword} />
          <Route path={'/restore-email'} exact component={EmailSent} />
          <Route path={'/restore/:token'} exact component={RestorePasswordSuccess} />
          <Route path={'/howitworks'} exact component={HowItWorks} />
          <PrivateRoute roles={['customer']} exact path={'/payment'} component={Payment} />
          <PrivateRoute
            roles={['customer']}
            exact
            path={'/startContest'}
            component={StartContestPage}
          />
          <PrivateRoute roles={['customer']} exact path={'/startContest/nameContest'}>
            <ContestCreationPage contestType={CONSTANTS.NAME_CONTEST} title={'Company Name'} />
          </PrivateRoute>
          <PrivateRoute roles={['customer']} exact path={'/startContest/taglineContest'}>
            <ContestCreationPage contestType={CONSTANTS.TAGLINE_CONTEST} title={'TAGLINE'} />
          </PrivateRoute>
          <PrivateRoute roles={['customer']} exact path={'/startContest/logoContest'}>
            <ContestCreationPage contestType={CONSTANTS.LOGO_CONTEST} title={'LOGO'} />
          </PrivateRoute>
          <PrivateRoute exact path={'/dashboard'} component={Dashboard} />
          <PrivateRoute exact path={'/contest/:id'} component={ContestPage} />
          <PrivateRoute exact path={'/account'} component={UserProfile} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <ChatContainer />
    </Router>
  );
}

export default App;
