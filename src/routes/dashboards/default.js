import React, { Component, Fragment } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux"
import IntlMessages from "../../util/IntlMessages";
import { injectIntl} from 'react-intl'
import {
  Row,
  Container,
  Card,
  CardBody,
  CardTitle,
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Progress,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  CustomInput,
  CardHeader
} from "reactstrap";
import Sortable from "react-sortablejs"

import Select from "react-select";
import CustomSelectInput from "../../components/CustomSelectInput";
import { NavLink, Link } from "react-router-dom"
import PerfectScrollbar from "react-perfect-scrollbar";
import { Colxx, Separator } from "../../components/CustomBootstrap"
import BreadcrumbContainer from "../../components/BreadcrumbContainer";
import { LineShadow } from "../../components/Charts";
import {
  lineChartConfig
} from "../../constants/chartConfig"

import SmallListTickets from '../../components/Dashboard/tickets/smallListTickets'
import SmallListUsers from '../../components/Dashboard/users/smallListDefaultUsers'

let dateFormat = require('dateformat')

const icon_cloud = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon kt-svg-icon--sm"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24" /><path d="M4.875,20.75 C4.63541667,20.75 4.39583333,20.6541667 4.20416667,20.4625 L2.2875,18.5458333 C1.90416667,18.1625 1.90416667,17.5875 2.2875,17.2041667 C2.67083333,16.8208333 3.29375,16.8208333 3.62916667,17.2041667 L4.875,18.45 L8.0375,15.2875 C8.42083333,14.9041667 8.99583333,14.9041667 9.37916667,15.2875 C9.7625,15.6708333 9.7625,16.2458333 9.37916667,16.6291667 L5.54583333,20.4625 C5.35416667,20.6541667 5.11458333,20.75 4.875,20.75 Z" id="check" fill="#000000" fill-rule="nonzero" opacity="0.3" /><path d="M2,11.8650466 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L12.9835977,18 C12.7263047,14.0909841 9.47412135,11 5.5,11 C4.23590829,11 3.04485894,11.3127315 2,11.8650466 Z M6,7 C5.44771525,7 5,7.44771525 5,8 C5,8.55228475 5.44771525,9 6,9 L15,9 C15.5522847,9 16,8.55228475 16,8 C16,7.44771525 15.5522847,7 15,7 L6,7 Z" id="Combined-Shape" fill="#000000" /></g></svg>'

const icon_plus = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon kt-svg-icon--success kt-svg-icon--md"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="Shape" points="0 0 24 0 24 24 0 24" /><path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero" opacity="0.3" /><path d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z" id="Combined-Shape" fill="#000000" /></g></svg>'

const icon_delivered = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon kt-svg-icon--brand"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24"></rect><path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" id="Combined-Shape" fill="#000000"></path><rect id="Rectangle-Copy-2" fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519) " x="16.3255682" y="2.94551858" width="3" height="18" rx="1"></rect></g></svg>'

let now = new Date()


const defaultDashboard = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleChangeType = this.handleChangeType.bind(this);
  //
  //   this.state = {
  //     selectedOptions: [],
  //     selectedOptionsType: []
  //   };
  // }
  //
  // handleChange = selectedOption => {
  //   this.setState({ selectedOption });
  // };
  //
  // handleChangeType = selectedOptionsType => {
  //   this.setState({ selectedOptionsType });
  // };


  return (
    <Fragment>
      <Row>
        <Colxx xxs="12">
          <div className="kt-subheader   kt-grid__item" id="kt_subheader">
            <div className="kt-subheader__main">
              <BreadcrumbContainer
                heading={<IntlMessages id="menu.default" />}
                match={props.match}
              />
            </div>

            <div className="kt-subheader__toolbar">
							<div className="kt-subheader__wrapper">
								<Link to="#" className="btn kt-subheader__btn-daterange" id="kt_dashboard_daterangepicker" data-toggle="kt-tooltip" title="Select dashboard daterange" data-placement="left">
									<span className="kt-subheader__btn-daterange-title" id="kt_dashboard_daterangepicker_title">Today</span>&nbsp;
									<span className="kt-subheader__btn-daterange-date" id="kt_dashboard_daterangepicker_date">{dateFormat(now, "mmm d")}</span>
                  <div dangerouslySetInnerHTML={{ __html: icon_cloud }} />
                </Link>
								<div className="dropdown dropdown-inline" data-toggle="kt-tooltip" title="Quick actions" data-placement="left">
									<Link to="#" className="btn btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<div dangerouslySetInnerHTML={{ __html: icon_plus }} />
									</Link>
									<div className="dropdown-menu dropdown-menu-fit dropdown-menu-md dropdown-menu-right">

										<ul className="kt-nav">
											<li className="kt-nav__head">
												Add anything or jump to:
												<i className="flaticon2-information" data-toggle="kt-tooltip" data-placement="right" title="Click to learn more..."></i>
											</li>
											<li className="kt-nav__separator"></li>
											<li className="kt-nav__item">
												<Link to="#" className="kt-nav__link">
													<i className="kt-nav__link-icon flaticon2-drop"></i>
													<span className="kt-nav__link-text">Order</span>
												</Link>
											</li>
											<li className="kt-nav__item">
												<Link to="#" className="kt-nav__link">
													<i className="kt-nav__link-icon flaticon2-calendar-8"></i>
													<span className="kt-nav__link-text">Ticket</span>
												</Link>
											</li>
											<li className="kt-nav__item">
												<Link to="#" className="kt-nav__link">
													<i className="kt-nav__link-icon flaticon2-link"></i>
													<span className="kt-nav__link-text">Goal</span>
												</Link>
											</li>
											<li className="kt-nav__item">
												<Link to="#" className="kt-nav__link">
													<i className="kt-nav__link-icon flaticon2-new-email"></i>
													<span className="kt-nav__link-text">Support Case</span>
													<span className="kt-nav__link-badge">
														<span className="kt-badge kt-badge--success">5</span>
													</span>
												</Link>
											</li>
											<li className="kt-nav__separator"></li>
											<li className="kt-nav__foot">
												<Link to="#" className="btn btn-label-brand btn-bold btn-sm" href="#">Upgrade plan</Link>
												<Link to="#" className="btn btn-clean btn-bold btn-sm" href="#" data-toggle="kt-tooltip" data-placement="right" title="Click to learn more...">Learn more</Link>
											</li>
										</ul>


									</div>
								</div>
							</div>
            </div>
          </div>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Sortable className="row icon-cards-row mb-2">
            <Colxx xxs="6" sm="4" md="3" className="mb-4">
              <Card>
                <CardBody className="text-center">
                  <i className="iconsmind-Alarm" />
                  <p className="card-text font-weight-semibold mb-0">
                    Pending Orders
                  </p>
                  <p className="lead text-center">14</p>
                </CardBody>
              </Card>
            </Colxx>

            <Colxx xxs="6" sm="4" md="3" className="mb-4">
              <Card>
                <CardBody className="text-center">
                  <i className="iconsmind-Basket-Coins" />
                  <p className="card-text font-weight-semibold mb-0">
                    Completed Orders
                  </p>
                  <p className="lead text-center">32</p>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="6" sm="4" md="3" className="mb-4">
              <Card>
                <CardBody className="text-center">
                  <i className="iconsmind-Arrow-Refresh" />
                  <p className="card-text font-weight-semibold mb-0">
                    Refund Requests
                  </p>
                  <p className="lead text-center">74</p>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="6" sm="4" md="3" className="mb-4">
              <Card>
                <CardBody className="text-center">
                  <i className="iconsmind-Mail-Read" />
                  <p className="card-text font-weight-semibold mb-0">
                    New Comments
                  </p>
                  <p className="lead text-center">25</p>
                </CardBody>
              </Card>
            </Colxx>
          </Sortable>
        </Colxx>
      </Row>

      <Row>
        <Colxx md="4" className="mb-4">
          <div className="kt-portlet kt-portlet--fit kt-portlet--head-lg kt-portlet--head-overlay kt-portlet--skin-solid kt-portlet--height-fluid">
            <div className="kt-portlet__head kt-portlet__head--noborder kt-portlet__space-x">
							<div className="kt-portlet__head-label">
								<h3 className="kt-portlet__head-title">
									Activity
								</h3>
							</div>
							<div className="kt-portlet__head-toolbar">
								<Link to="#" className="btn btn-label-light btn-sm btn-bold dropdown-toggle" data-toggle="dropdown">
									Export
								</Link>
								<div className="dropdown-menu dropdown-menu-fit dropdown-menu-right">

								</div>
							</div>
						</div>

            <div className="kt-portlet__body kt-portlet__body--fit">
							<div className="kt-widget17">
								<div className="kt-widget17__visual kt-widget17__visual--chart kt-portlet-fit--top kt-portlet-fit--sides" style={{ backgroundColor: "#fd397a" }}>
									<div className="kt-widget17__chart" style={{ height: "320px" }}>
										<canvas id="kt_chart_activities"></canvas>
									</div>
								</div>
								<div className="kt-widget17__stats">
									<div className="kt-widget17__items">
										<div className="kt-widget17__item">
											<span className="kt-widget17__icon">
												aaa</span>
											<span className="kt-widget17__subtitle">
												Delivered
											</span>
											<span className="kt-widget17__desc">
												15 New Paskages
											</span>
										</div>
										<div className="kt-widget17__item">
											<span className="kt-widget17__icon">
												aaa</span>
											<span className="kt-widget17__subtitle">
												Ordered
											</span>
											<span className="kt-widget17__desc">
												72 New Items
											</span>
										</div>
									</div>
									<div className="kt-widget17__items">
										<div className="kt-widget17__item">
											<span className="kt-widget17__icon">
												aaa</span>
											<span className="kt-widget17__subtitle">
												Reported
											</span>
											<span className="kt-widget17__desc">
												72 Support Cases
											</span>
										</div>
										<div className="kt-widget17__item">
											<span className="kt-widget17__icon">
												aaa</span>
											<span className="kt-widget17__subtitle">
												Arrived
											</span>
											<span className="kt-widget17__desc">
												34 Upgraded Boxes
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
          </div>
        </Colxx>

        <SmallListTickets />


        <SmallListUsers />
      </Row>


    </Fragment>
  )
}


export default injectIntl(defaultDashboard)
