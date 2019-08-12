// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Appolus
  Author: Angel Labrada Mass贸
 */

// ===============================================================
// Import Modules
// ===============================================================
import React from "react";
import { Route } from "react-router-dom"

// Login layout
const LoginLayout = ({ children }) => (
  <div>
    {children}
  </div>
);

const LoginLayoutRoute = ({component: Component, ...rest}) => {

  return (
    <Route {...rest} render={matchProps => (
      <LoginLayout>
        <Component {...matchProps} />
      </LoginLayout>
    )} />
  )
};

export default LoginLayoutRoute
