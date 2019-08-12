import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import signin from './signin'

const Pages = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/signin`} />
          <Route path={`${match.url}/signin`} component={signin} />
          <Redirect to="/error" />
        </Switch>
    </div>
);

export default Pages;
