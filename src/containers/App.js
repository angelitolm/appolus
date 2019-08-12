import React, { Fragment } from 'react';
import PropTypes from "prop-types"
import { Redirect, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import ColorSwitcher from '../components/ColorSwitcher'
import { NotificationContainer } from "../components/ReactNotifications";

// import { defaultStartPath } from '../constants/defaultValues'

import { connect } from "react-redux";

import AppLocale from '../lang';

import dashboards from '../routes/dashboards/'
import pages from '../routes/pages';
import ui from '../routes/ui'

import MainRoute from '../routes'
// import Home from '../routes/frontend/homepage'
// import login from '../routes/pages/login'
// import defaultDashboard from '../routes/dashboards/default'

// ===============================================================
// Layout Routes
// ===============================================================
import LoginLayoutRoute from '../routes/layouts/LoginLayoutRoute'
import PublicLayoutRoute from '../routes/layouts/PublicLayoutRoute'
import PrivateLayoutRoute from '../routes/layouts/PrivateLayoutRoute'
import NotFoundLayoutRoute from '../routes/layouts/NotFoundRoute'

import signin from '../routes/pages/signin';
import error from '../routes/pages/error'

import TopNav from '../containers/TopNav'
import Sidebar from '../containers/Sidebar'

import homepage from '../routes/frontend/homepage'
import dashboard from '../routes/dashboards/default'

import '../assets/css/vendor/bootstrap.min.css'
import '../assets/css/style.bundle.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-table/react-table.css'


const App = ({ component: Component, location, authUser, locale, ...rest }) => {

// const { containerClassnames} = props;
		const currentAppLocale = AppLocale[locale];
		// if (location.pathname === '/'/* || location.pathname === '/app' || location.pathname === '/app/'*/) {
		// 	return (<Redirect to={homePagePath} />);
		// }

		return (
			<Fragment>
				<IntlProvider
					locale={currentAppLocale.locale}
					messages={currentAppLocale.messages}
				>
					<Fragment>
						<NotificationContainer />
  						<Switch>
                <PublicLayoutRoute exact path="/" component={homepage} />
                <LoginLayoutRoute exact path="/signin" component={signin} />
                <PrivateLayoutRoute path="/app" component={MainRoute} />
                <NotFoundLayoutRoute exact path="*" component={error} />
                <Redirect to="/404" />
  						</Switch>
						<ColorSwitcher />
					</Fragment>
				</IntlProvider>
			</Fragment>
		)
}

// MainRoute.propTypes = {
//   authUser: PropTypes.object.isRequired
// };


const mapStateToProps = ({ settings, authUser }) => {

  const { user } = authUser.isAuthenticated
	const { locale } = settings;
	return { /*user,*/locale, user };
};

export default connect(mapStateToProps, {})(App);
