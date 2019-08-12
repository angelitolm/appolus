import React from 'react';
import { Route, Switch } from 'react-router-dom'
// import { CSSTransitionGroup } from 'react-transition-group'

import defaultDash from './default';
import userList from './users/userList'
import AddUser from './users/add'


const Dashboards = () => (
    <div className="dashboard-wrapper">
        <Switch>
          <Route path="/app/dashboard" component={defaultDash} />
          <Route path="/app/users/list" component={userList} />
          <Route path="/app/users/add" component={AddUser} />
        </Switch>
    </div>
);

export default Dashboards
