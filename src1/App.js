import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode"
import setAuthToken from "./util/setAuthToken"
import { setCurrentUser, logoutUser } from "./constants/authActions"
import store from "./redux/store";

import ReactDOM from 'react-dom';

import App from "./containers/App";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())

    // Redirect to login
    window.location.href = "/signin"
  }
}



// <Route path="/" component={App} />

const MainApp = () => (
  <Provider store={store}>
  <Router>
      <Switch>
    <Route path="/" component={App} />
    </Switch>
    </Router>
  </Provider>
);
export default  ReactDOM.render(
  <MainApp />,
  document.getElementById("root")
);
