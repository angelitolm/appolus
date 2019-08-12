// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Appolus
  Author: Angel Labrada Mass贸
 */

// ===============================================================
// Import Modules
// ===============================================================
import React, { Fragment } from "react";
import { Route } from "react-router-dom"

const PublicLayout = ({children}) => (
  <Fragment>
    {children}
  </Fragment>
)

const PublicLayoutRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <PublicLayout>
        <Component {...matchProps} />
      </PublicLayout>
    )} />
  )
}

export default PublicLayoutRoute
