import React, { useState, useEffect, useRef, Fragment } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { SignInUser } from "../../constants/authActions"
import IntlMessages from "../../util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../../components/CustomBootstrap";

const SignIn = (props) => {

  // Hooks useState
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ errors, setErrors ] = useState([])

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  // ****** BEGINNING OF CHANGE ******
  useEffect(() => {
    // If logged in and user navigates to SignIn page, should redirect them to dashboard
    if (props.authUser.isAuthenticated) {
      props.history.push("/app/dashboard")
    }

    if (props.errors) {
      setErrors({errors})
    }
  }, [errors])
  // ****** END OF CHANGE ******

  // ****** BEGINNING OF CHANGE ******
  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.

  }, [])
  // ****** END OF CHANGE ******



   const onSubmit = e => {
     e.preventDefault()

     const userData = {
       email,
       password
     }

     // since we handle the redirect within our component, we don't need to pass in props.history as a parameter
     props.SignInUser(userData)
   }


  return (
    <Fragment>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
              <Card className="auth-card">
                <div className="position-relative image-side ">
                  <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                  <p className="white mb-0">
                    Please use your credentials to login.
                    <br />
                    If you are not a member, please{" "}
                    <NavLink to={`/signup`} className="white">
                      register
                    </NavLink>
                    .
                  </p>
                </div>
                <div className="form-side">
                  <NavLink to={`/`} className="white">
                    <span className="logo-single" />
                  </NavLink>
                  <CardTitle className="mb-4">
                    <IntlMessages id="user.login-title" />
                  </CardTitle>
                  <form noValidate onSubmit={onSubmit}>
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                        value={props.email}
                        error={props.errors.email}
                      />
                      <span className="red-text">
                          {props.errors.email}
                          {props.errors.emailnotfound}
                        </span>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        value={props.password}
                        error={props.errors.password}
                      />
                      <span className="red-text">
                          {props.errors.password}
                          {props.errors.passwordincorrect}
                        </span>
                      <IntlMessages id="user.password" />
                    </Label>
                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to={`/forgot-password`}>
                        <IntlMessages id="user.forgot-password-question" />
                      </NavLink>
                      <Button
                        type="submit"
                        color="primary"
                        className="btn-shadow"
                        size="lg"
                      >
                        <IntlMessages id="user.login-button" />
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </Colxx>
          </Row>
        </div>
      </main>
    </Fragment>
  )
}

SignIn.propTypes = {
  SignInUser: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const authUser = state.authUser
  const errors = state.errors
  console.log("===== UserLoggued =====: ", authUser)
  return { authUser, errors }
}

export default connect(
  mapStateToProps,
  { SignInUser }
)(SignIn)
