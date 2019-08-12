import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


import alerts from './alerts';
import badges from './badges';
import buttons from './buttons';
import cards from './cards';
import carousel from './carousel';
import charts from './charts';
import collapse from './collapse';
import dropdowns from './dropdowns';
import editors from './editors';
// import forms from './forms';
// import formComponents from './form-components';
import icons from './icons';
import inputGroups from './input-groups';
import jumbotron from './jumbotron';
import modal from './modal';
import navigation from './navigation';
import popoverTooltip from './popover-tooltip';
import sortable from './sortable';
import tables from './tables';
import maps from './maps';


const Ui = () => (
  <div className="dashboard-wrapper">
    <Switch>
      <Route path="/app/ui/alerts" component={alerts} />
      <Route path={`/app/badges`} component={badges} />
      <Route path={`/app/buttons`} component={buttons} />
      <Route path={`/app/cards`} component={cards} />
      <Route path={`/app/carousel`} component={carousel} />
      <Route path={`/app/charts`} component={charts} />
      <Route path={`/app/collapse`} component={collapse} />
      <Route path={`/app/dropdowns`} component={dropdowns} />
      <Route path={`/app/editors`} component={editors} />


      <Route path={`/app/icons`} component={icons} />
      <Route path={`/app/input-groups`} component={inputGroups} />
      <Route path={`/app/jumbotron`} component={jumbotron} />
      <Route path={`/app/modal`} component={modal} />
      <Route path={`/app/navigation`} component={navigation} />
      <Route path={`/app/popover-tooltip`} component={popoverTooltip} />
      <Route path={`/app/sortable`} component={sortable} />
      <Route path={`/app/tables`} component={tables} />
      <Route path={`/app/maps`} component={maps} />
      <Redirect to="/404" />

    </Switch>
  </div>
  )

export default Ui
