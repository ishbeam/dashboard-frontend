import React, { Component } from 'react';
import { Redirect, Link, Route, withRouter } from 'react-router-dom';
import { withContext } from '../../context/provider';

function hasPermission(context, userType, requireAdmin) {
  const { isAuthenticated, user } = context;
  console.log(context)
  if(isAuthenticated) {
    return true;
  }
  return false;
}

const PrivateRoute = ({ component: Component, context, ...rest }) => (
  <Route 
    {...rest}
    render={props => hasPermission(context) ? (
        <Component {...props} 
          user={context.user} 
          isAuthenticated={context.isAuthenticated} />
      ) : 
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    }
  />
) 

// const PrivateRoute0 = ({ component: Component, context, ...rest }) => (
//   <Route 
//     {...rest}
//     render={props => hasPermission(context) ? (
//         <Component {...props} 
//           user={context.user} 
//           isAuthenticated={context.isAuthenticated} />
//       ) : 
//         <Redirect to={{
//           pathname: '/login',
//           state: { from: props.location }
//         }} />
//     }
//   />
// ) 

export default withContext(withRouter(PrivateRoute))
