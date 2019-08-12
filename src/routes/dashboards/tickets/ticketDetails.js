import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { injectIntl} from 'react-intl'
import {
  Row,
  Card,
  CardBody
} from "reactstrap"
import { SignInUser } from "../../../constants/authActions"
import { withSwalInstance } from 'sweetalert2-react'
import Swal from 'sweetalert2'

import { Colxx } from "../../../components/CustomBootstrap"
import BreadcrumbContainer from "../../../components/BreadcrumbContainer"
import IntlMessages from "../../../util/IntlMessages"

import imgUserDefaultFame from '../../../assets/img/users/user1.jpg'
import ImgTciketDefault from '../../../assets/img/tickets-default.png'

const icon_cloud = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon kt-svg-icon--sm"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24" /><path d="M4.875,20.75 C4.63541667,20.75 4.39583333,20.6541667 4.20416667,20.4625 L2.2875,18.5458333 C1.90416667,18.1625 1.90416667,17.5875 2.2875,17.2041667 C2.67083333,16.8208333 3.29375,16.8208333 3.62916667,17.2041667 L4.875,18.45 L8.0375,15.2875 C8.42083333,14.9041667 8.99583333,14.9041667 9.37916667,15.2875 C9.7625,15.6708333 9.7625,16.2458333 9.37916667,16.6291667 L5.54583333,20.4625 C5.35416667,20.6541667 5.11458333,20.75 4.875,20.75 Z" id="check" fill="#000000" fill-rule="nonzero" opacity="0.3" /><path d="M2,11.8650466 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L12.9835977,18 C12.7263047,14.0909841 9.47412135,11 5.5,11 C4.23590829,11 3.04485894,11.3127315 2,11.8650466 Z M6,7 C5.44771525,7 5,7.44771525 5,8 C5,8.55228475 5.44771525,9 6,9 L15,9 C15.5522847,9 16,8.55228475 16,8 C16,7.44771525 15.5522847,7 15,7 L6,7 Z" id="Combined-Shape" fill="#000000" /></g></svg>'

const icon_plus = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon kt-svg-icon--success kt-svg-icon--md"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="Shape" points="0 0 24 0 24 24 0 24" /><path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero" opacity="0.3" /><path d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z" id="Combined-Shape" fill="#000000" /></g></svg>'

const icon_numTicket = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon icon_numTicket"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24"/><g id="Group" transform="translate(12.500000, 12.000000) rotate(-315.000000) translate(-12.500000, -12.000000) translate(6.000000, 1.000000)" fill="#000000" opacity="0.3"><path d="M0.353553391,7.14644661 L3.35355339,7.14644661 C3.4100716,7.14644661 3.46549471,7.14175791 3.51945496,7.13274826 C3.92739876,8.3050906 5.04222146,9.14644661 6.35355339,9.14644661 C8.01040764,9.14644661 9.35355339,7.80330086 9.35355339,6.14644661 C9.35355339,4.48959236 8.01040764,3.14644661 6.35355339,3.14644661 C5.04222146,3.14644661 3.92739876,3.98780262 3.51945496,5.16014496 C3.46549471,5.15113531 3.4100716,5.14644661 3.35355339,5.14644661 L0.436511831,5.14644661 C0.912589923,2.30873327 3.3805571,0.146446609 6.35355339,0.146446609 C9.66726189,0.146446609 12.3535534,2.83273811 12.3535534,6.14644661 L12.3535534,19.1464466 C12.3535534,20.2510161 11.4581229,21.1464466 10.3535534,21.1464466 L2.35355339,21.1464466 C1.24898389,21.1464466 0.353553391,20.2510161 0.353553391,19.1464466 L0.353553391,7.14644661 Z" id="Combined-Shape" transform="translate(6.353553, 10.646447) rotate(-360.000000) translate(-6.353553, -10.646447) "/><rect id="Rectangle" x="2.35355339" y="13.1464466" width="8" height="2" rx="1"/><rect id="Rectangle-Copy" x="3.35355339" y="17.1464466" width="6" height="2" rx="1"/></g></g></svg>'

const icon_titleTicket = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="Rectangle-5" x="0" y="0" width="24" height="24"/><path d="M6,7 C7.1045695,7 8,6.1045695 8,5 C8,3.8954305 7.1045695,3 6,3 C4.8954305,3 4,3.8954305 4,5 C4,6.1045695 4.8954305,7 6,7 Z M6,9 C3.790861,9 2,7.209139 2,5 C2,2.790861 3.790861,1 6,1 C8.209139,1 10,2.790861 10,5 C10,7.209139 8.209139,9 6,9 Z" id="Oval-7" fill="#000000" fill-rule="nonzero"/><path d="M7,11.4648712 L7,17 C7,18.1045695 7.8954305,19 9,19 L15,19 L15,21 L9,21 C6.790861,21 5,19.209139 5,17 L5,8 L5,7 L7,7 L7,8 C7,9.1045695 7.8954305,10 9,10 L15,10 L15,12 L9,12 C8.27142571,12 7.58834673,11.8052114 7,11.4648712 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero" opacity="0.3"/><path d="M18,22 C19.1045695,22 20,21.1045695 20,20 C20,18.8954305 19.1045695,18 18,18 C16.8954305,18 16,18.8954305 16,20 C16,21.1045695 16.8954305,22 18,22 Z M18,24 C15.790861,24 14,22.209139 14,20 C14,17.790861 15.790861,16 18,16 C20.209139,16 22,17.790861 22,20 C22,22.209139 20.209139,24 18,24 Z" id="Oval-7-Copy" fill="#000000" fill-rule="nonzero"/><path d="M18,13 C19.1045695,13 20,12.1045695 20,11 C20,9.8954305 19.1045695,9 18,9 C16.8954305,9 16,9.8954305 16,11 C16,12.1045695 16.8954305,13 18,13 Z M18,15 C15.790861,15 14,13.209139 14,11 C14,8.790861 15.790861,7 18,7 C20.209139,7 22,8.790861 22,11 C22,13.209139 20.209139,15 18,15 Z" id="Oval-7-Copy-3" fill="#000000" fill-rule="nonzero"/></g></svg>'

let dateFormat = require('dateformat')

let now = new Date()

const TicketDetails = (props) => {

  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [loading, setLoading] = useState(false) // Loading
  const [ticket, setTicket] = useState([])
  const [comments, setComments] = useState([])
  const [newcomment, setNewcomment] = useState("")

  const getId = props.location.pathname.toString().split("/")

  const {user} = props.authUser


  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    const fetchTicketByNumber = async () => {
      const res = await axios.get(`/api/tickets/details/${getId[4]}`)
      setTicket(res.data.ticket)
    }

    fetchTicketByNumber()

    const fetchCommentsByTicket = async () => {
      const res = await axios.get(`/api/ticket/comments/list/${getId[4]}`)
      setComments(res.data.ticketcomments)
    }

    fetchCommentsByTicket()
  }, [])



  const onChangeComment = e => {
    if (loading) {
      return <div className="loading"></div>
    }
    setNewcomment(e.target.value)
  }

  const newComment = {
    ticket: getId[4],
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    description: newcomment
  }

  const addComment = async e => {
    e.preventDefault()
    await fetch('/api/ticket/comments/add', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      const fetchComments = async () => {
        setLoading(true)
        const res = await axios.get(`/api/ticket/comments/list/${getId[4]}`)
        setComments(res.data.ticketcomments)
        withSwalInstance(Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Success!',
          text: 'The comment has been saved successfully',
          showConfirmButton: false,
          timer: 4500,
          // backdrop: false,
          toast: true
        }))
        setLoading(false)
      }

      fetchComments()

      setNewcomment("")
    })
    .catch(err => {
      withSwalInstance(Swal.fire({
        position: 'top-end',
        type: 'error',
        title: 'Success!',
        text: 'Oops!!!, somethings went wrong.',
        showConfirmButton: false,
        timer: 4500,
        // backdrop: false,
        toast: true
      }))
      setLoading(false)
    })
  }

  return (
    <>
    <Row>
      <Colxx xxs="12">
        <div className="kt-subheader   kt-grid__item" id="kt_subheader">
          <div className="kt-subheader__main">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.tickets" />}
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
        <div className="kt-grid__item kt-grid__item--fluid" id="kt_content">
          <div className="kt-portlet kt-portlet--height-fluid">
              <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                  <div dangerouslySetInnerHTML={{ __html: icon_numTicket }} />
                  <h3 className="kt-portlet__head-title">
                     {ticket.number} - {ticket.title}
                  </h3>
                </div>
              </div>
            <div className="kt-portlet__body">
              <div className="kt-widget3">
                  <div className="kt-widget3__item" key={ticket._id}>
                    <div className="kt-widget3__header">
                      <div className="kt-widget3__user-img">
                        <img className="kt-widget3__img" src={imgUserDefaultFame} alt="" />
                      </div>
                      <div className="kt-widget3__info">
                        <Link to="#" className="kt-widget3__username">
                          {ticket.name}
                        </Link><br />
                        <span className="kt-widget3__time">
                          {dateFormat(ticket.date, 'd mmm yyyy h:mmtt')}
                        </span>
                      </div>
                      <span className="kt-widget3__status kt-font-info">
                        { ticket.status === "Open"
                          ? <span className="kt-badge kt-badge--warning kt-badge--inline">
                              <i className="simple-icon-bell" /> &nbsp; {ticket.status}
                            </span>
                          : <span className="kt-badge kt-badge--success kt-badge--inline">
                              <i className="flaticon2-check-mark" /> &nbsp; {ticket.status}
                            </span>
                        }
                      </span>
                    </div>
                    <div className="kt-widget3__body">
                      <p className="kt-widget3__text">
                        {ticket.description}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </Colxx>
      </Row>

      <Row  mb="2">
        <Colxx xxs="2" />
        <Colxx xxs="8">
          <Row>
            <Colxx xxs="4">
              <Card>
                <CardBody>
                  <div style={{ textAlign: "center !important" }}>
                    <img className="img-ticket-default" src={ImgTciketDefault} alt="Img Default" />
                  </div>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="4">
              <Card>
                <CardBody>
                  <div style={{ textAlign: "center !important" }}>
                    <img className="img-ticket-default" src={ImgTciketDefault} alt="Img Default" />
                  </div>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="4">
              <Card>
                <CardBody>
                  <div style={{ textAlign: "center !important" }}>
                    <img className="img-ticket-default" src={ImgTciketDefault} alt="Img Default" />
                  </div>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
        <Colxx xxs="2" />
      </Row>

      <Row style={{ marginTop: "25px", marginBottom: "75px" }}>
        <Colxx xxs="12">
          <div className="kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div className="kt-portlet kt-portlet--height-fluid">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">
                      Comments
                    </h3>
                  </div>
                </div>
              <div className="kt-portlet__body">
                <div className="kt-widget3">
                {comments.map(comment => (
                  <div className="kt-widget3__item" key={comment._id}>
                    <div className="kt-widget3__header">
                      <div className="kt-widget3__user-img">
                        <img className="kt-widget3__img" src={imgUserDefaultFame} alt="" />
                      </div>
                      <div className="kt-widget3__info">
                        <Link to="#" className="kt-widget3__username">
                          {comment.name}
                        </Link><br />
                        <span className="kt-widget3__time">
                          {dateFormat(comment.date, 'd mmm yyyy h:mmtt')}
                        </span>
                      </div>
                      <span className="kt-widget3__status kt-font-info" />
                    </div>
                    <div className="kt-widget3__body">
                      <p className="kt-widget3__text">
                        {comment.description}
                      </p>
                    </div>
                    </div>
                ))}

                </div>
              </div>
            </div>

            <div className="kt-portlet">
							<div className="kt-portlet__head">
								<div className="kt-portlet__head-label">
									<h3 className="kt-portlet__head-title">
										Leave A Comment
									</h3>
								</div>
							</div>

							<form className="kt-form" noValidate onSubmit={addComment}>
								<div className="kt-portlet__body">
									<div className="form-group form-group-last">
										<div className="alert alert-secondary" role="alert">
											<div className="alert-icon"><i className="flaticon-warning kt-font-brand"></i></div>
											<div className="alert-text">
												Add the disabled or readonly boolean attribute on an input to prevent user interactions.
												Disabled inputs appear lighter and add a <code>not-allowed</code> cursor.
											</div>
										</div>
									</div>

									<div className="form-group">
										<textarea className="form-control" value={newcomment} rows="3" onChange={onChangeComment}></textarea>
									</div>
								</div>
								<div className="kt-portlet__foot">
									<div className="kt-form__actions">
										<button type="submit" className="btn btn-brand">Submit</button>
										<button type="reset" className="btn btn-secondary">Cancel</button>
									</div>
								</div>
							</form>

						</div>
          </div>
        </Colxx>
      </Row>
    </>
  )
}

TicketDetails.propTypes = {
  SignInUser: PropTypes.func.isRequired
}

const mapStateToProps = ({ authUser }) => {

  return { authUser };
}

export default injectIntl(connect(
  mapStateToProps,
  {SignInUser}
)(TicketDetails))
