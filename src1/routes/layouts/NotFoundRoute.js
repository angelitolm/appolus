/*
  This file is a part of iBot
  Author: Angel Labrada Massó
  Date: 2/5/2019 2:35pm
 */

// ===============================================================
// Import Modules
// ===============================================================
import React from "react";
import { Route } from "react-router-dom"

// App layout
const AppLayout = ({ children }) => (
  <div>
    {children}
  </div>
);

const NotFoundRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <AppLayout>
        <Component {...matchProps} />
      </AppLayout>
    )} />
  )
};

export default NotFoundRoute
