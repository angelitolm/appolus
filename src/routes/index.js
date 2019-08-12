import React from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll'

// Sidebar and TopNav
import TopNav from '../containers/TopNav'
import Sidebar from '../containers/Sidebar';

// Dashboard Component
import defaultDash from './dashboards/default'

// Users Component
import userList from './dashboards/users/userList'
import addUser from './dashboards/users/add'

// Tickets Component
import TicketsList from './dashboards/tickets/ticketsList'
import AddTickets from './dashboards/tickets/add'
import ticketDetail from './dashboards/tickets/ticketDetails'

import alerts from './ui/alerts';
import badges from './ui/badges';
import buttons from './ui/buttons';
import cards from './ui/cards';
import carousel from './ui/carousel';
import charts from './ui/charts';
import collapse from './ui/collapse';
import dropdowns from './ui/dropdowns';
import editors from './ui/editors';
// import forms from './ui/forms';
// import formComponents from './ui/form-components';
import icons from './ui/icons';
import inputGroups from './ui/input-groups';
import jumbotron from './ui/jumbotron';
import modal from './ui/modal';
import navigation from './ui/navigation';
import popoverTooltip from './ui/popover-tooltip';
import sortable from './ui/sortable';
import tables from './ui/tables';
import maps from './ui/maps';

// import PublicLayoutRoute from './layouts/PublicLayoutRoute'
import PrivateLayoutRoute from './layouts/PrivateLayoutRoute'

import packajes from '../../package.json'


import { connect } from 'react-redux';

const MainApp = props => {

		const { containerClassnames} = props;

    return (
    	<div id="app-container" className={containerClassnames}>
    		<TopNav history={props.history} />
    		<Sidebar/>
				<ScrollAnimation animateIn="slideInUp" animateOut="fadeOut">
    		<main>
    			<div className="container-fluid">
					  <div className="dashboard-wrapper">
	    				<Switch>
							  { /* Dashboard */ }
								<PrivateLayoutRoute path="/app/dashboard" component={defaultDash} />

								{ /* Tickets */ }
								<PrivateLayoutRoute exact path="/app/tickets/list" component={TicketsList} />
								<PrivateLayoutRoute exact path="/app/tickets/add" component={AddTickets} />
								<PrivateLayoutRoute path="/app/tickets/:ticketId" component={ticketDetail} />

								{ /* Users */ }
								<PrivateLayoutRoute exact path="/app/users/list" component={userList} />
								<PrivateLayoutRoute exact path="/app/users/add" component={addUser} />

								{ /* UI */ }
								<PrivateLayoutRoute path="/app/ui/alerts" component={alerts} />
					      <PrivateLayoutRoute path="/app/ui/badges" component={badges} />
					      <PrivateLayoutRoute path="/app/ui/buttons" component={buttons} />
					      <PrivateLayoutRoute path="/app/ui/cards" component={cards} />
					      <PrivateLayoutRoute path="/app/ui/carousel" component={carousel} />
					      <PrivateLayoutRoute path="/app/ui/charts" component={charts} />
					      <PrivateLayoutRoute path="/app/ui/collapse" component={collapse} />
					      <PrivateLayoutRoute path="/app/ui/dropdowns" component={dropdowns} />
					      <PrivateLayoutRoute path="/app/ui/editors" component={editors} />


					      <PrivateLayoutRoute path="/app/ui/icons" component={icons} />
					      <PrivateLayoutRoute path="/app/ui/input-groups" component={inputGroups} />
					      <PrivateLayoutRoute path="/app/ui/jumbotron" component={jumbotron} />
					      <PrivateLayoutRoute path="/app/ui/modal" component={modal} />
					      <PrivateLayoutRoute path="/app/ui/navigation" component={navigation} />
					      <PrivateLayoutRoute path="/app/ui/popover-tooltip" component={popoverTooltip} />
					      <PrivateLayoutRoute path="/app/ui/sortable" component={sortable} />
					      <PrivateLayoutRoute path="/app/ui/tables" component={tables} />
					      <PrivateLayoutRoute path="/app/ui/maps" component={maps} />
					      <Redirect to="/404" />
	    				</Switch>
						</div>
    			</div>
    		</main>

				<div className="footer_info">
					<div className="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop">
						<div className="kt-footer__copyright">
							2019&nbsp;©&nbsp;<a href="https://github.com/angelitolm/appolus" target="_blank" className="kt-link">Appolus v{packajes.version} </a> &nbsp;&nbsp;Developed by: &nbsp;<a target="_blank" className="kt-link" href="mailto:angelitolabm@gmail.com"> Angel Labrada Mass&oacute;</a>
						</div>
						<div className="kt-footer__menu">
							<a href="http://keenthemes.com/metronic" target="_blank" className="kt-footer__menu-link kt-link">About</a>
							<a href="http://keenthemes.com/metronic" target="_blank" className="kt-footer__menu-link kt-link">Team</a>
							<a href="http://keenthemes.com/metronic" target="_blank" className="kt-footer__menu-link kt-link">Contact</a>
						</div>
					</div>
				</div>
				</ScrollAnimation>
    	</div>
    );
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames} = menu
	return { containerClassnames }
  }

export default withRouter(connect(mapStateToProps, {})(MainApp))
