import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import 'antd/dist/antd.less';
import { Spin } from 'antd';
import Responses from './views/pages/responses/responses';

const loading = (
  <div className="initial-spin-container"><Spin spinning={true} size="large" /></div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Overview = React.lazy(() => import('./views/pages/overview/Overview'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
class App extends Component {


  render() {
    // let pin = localStorage.getItem('pin');
    let password = localStorage.getItem('password');
    // let responseId = localStorage.getItem('responseId');
    return (
      <BrowserRouter basename='/eforms'>

        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                if (password) {
                  return <Redirect to="/responses" />
                }
                return <Redirect to='/login' />
              }} />
            <Route
              path='/login'
              name='Login Page'
              render={(props) => <Login {...props} />}
            />

            <Route
              path='/checklist/:id'
              name='Checklist'
              render={(props) => {
                return <TheLayout {...props} />
              }}
            />

            <Route
              path='/responses'
              name='Responses'
              render={(props) => {
                return <Responses {...props} />
              }}
            />
            {/*
            {
              !password && <Redirect to='/login' />
            } */}

            <Route
              path='/create'
              name='Overview'
              render={(props) => {
                return <Overview {...props} />
              }}
            />



            <Route />

            <Route component={Page404} />
          </Switch>
        </React.Suspense>
      </BrowserRouter >
    );
  }
}

export default App;
