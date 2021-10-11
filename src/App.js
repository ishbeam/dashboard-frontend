import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Login from './components/auth/Login';
import CreateAccount from './components/account/CreateAccount';

import Supplier from './components/supplier/Supplier';

import Retailer from './components/retailer/Retailer';

import NotFound from './NotFound';

import PageWithList from './test/PageWithList';


import Provider from './context/provider';


import dotenv from 'dotenv';
dotenv.config()


class App extends Component {
  render() {
    return (
      <Provider >
        <BrowserRouter>
          <Switch>


            <Route exact path="/" render={() => (
              <div>
                <Redirect to='/login' />
              </div>
            )}
            />

            <Route exact path='/list' render={() => (
              <PageWithList />
            )} />


            <Route exact path="/login" render={() => (<Login />)} />
            {/* <Route exact path="/forgot-password" render={() => (<ForgotPassword/>)} /> */}
            {/* <Route exact path="/reset-password/:token" render={({ match }) => (<ResetPassword token={match.params.token}/>)} /> */}
            {/* <Route exact path='/invite/:token' component={ConfirmInvite} /> */}
            {/* aka create user <Route exact path='/create-therapist' component={CreateTherapist} />*/}
            {/*<Route exact path='/sign-up/:token?' component={CreateProvider} />*/}
            <Route exact path='/sign-up' component={CreateAccount} />

            <Route path='/retailer' component={Retailer} />

            <Route path='/supplier' component={Supplier} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
