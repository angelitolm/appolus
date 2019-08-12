import React, { Component, Fragment } from "react";
import IntlMessages from "../../util/IntlMessages";
import { Row, Card, CardTitle,Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../../components/CustomBootstrap";

const style = {
  "mymain": {
    marginLeft: '60px',
    marginTop: '165px !important',
    marginRight: '60px',
    marginBottom: '40px',
    transition:' marginLeft 300ms'
  }
}

class Error404 extends Component {


  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main style={{ marginTop: "165px !important" }}>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                    <p className="white mb-0">Yes, it is indeed!</p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/signin`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="pages.error-title" />
                    </CardTitle>
                    <p className="mb-0 text-muted text-small mb-0">
                      <IntlMessages id="pages.error-code" />
                    </p>
                    <p className="display-1 font-weight-bold mb-5">404</p>
                    <Button
                      href="/signin"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      <IntlMessages id="pages.go-back-home" />
                    </Button>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}
export default Error404;
