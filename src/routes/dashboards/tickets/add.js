import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from "react-redux"
import { injectIntl } from 'react-intl'
import {
  Row
} from 'reactstrap'
import { Colxx } from '../../../components/CustomBootstrap'
import BreadcrumbContainer from "../../../components/BreadcrumbContainer"
import IntlMessages from '../../../util/IntlMessages'
import { Link } from "react-router-dom"
import { withSwalInstance } from 'sweetalert2-react'
import Swal from 'sweetalert2'

// Components
import Pagination from '../../../components/Dashboard/tickets/Pagination'

let dateFormat = require('dateformat')

const icon_cloud = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon kt-svg-icon--sm"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24" /><path d="M4.875,20.75 C4.63541667,20.75 4.39583333,20.6541667 4.20416667,20.4625 L2.2875,18.5458333 C1.90416667,18.1625 1.90416667,17.5875 2.2875,17.2041667 C2.67083333,16.8208333 3.29375,16.8208333 3.62916667,17.2041667 L4.875,18.45 L8.0375,15.2875 C8.42083333,14.9041667 8.99583333,14.9041667 9.37916667,15.2875 C9.7625,15.6708333 9.7625,16.2458333 9.37916667,16.6291667 L5.54583333,20.4625 C5.35416667,20.6541667 5.11458333,20.75 4.875,20.75 Z" id="check" fill="#000000" fill-rule="nonzero" opacity="0.3" /><path d="M2,11.8650466 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L12.9835977,18 C12.7263047,14.0909841 9.47412135,11 5.5,11 C4.23590829,11 3.04485894,11.3127315 2,11.8650466 Z M6,7 C5.44771525,7 5,7.44771525 5,8 C5,8.55228475 5.44771525,9 6,9 L15,9 C15.5522847,9 16,8.55228475 16,8 C16,7.44771525 15.5522847,7 15,7 L6,7 Z" id="Combined-Shape" fill="#000000" /></g></svg>'

const icon_plus = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon kt-svg-icon--success kt-svg-icon--md"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="Shape" points="0 0 24 0 24 24 0 24" /><path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero" opacity="0.3" /><path d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z" id="Combined-Shape" fill="#000000" /></g></svg>'

let now = new Date()

const AddTickets = (props) => {

  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [loading, setLoading] = useState(false) // Loading
  const [_id, setId] = useState("")
  const [tickets, setTickets] = useState([])
  const [ticketid, setTicketid] = useState("")
  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState("")
  const [factory, setFactory] = useState("")
  const [occupation, setOccupation] = useState("")
  const [address, setAddress] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [plugin, setPlugin] = useState("")
  const [specificity, setSpecificity] = useState("")
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1) // Pagination
  const [ticketsPerPage, setTotalUsersPerPage] = useState(3) // Pagination

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    // List tickets on page loaded
    const fetchTickets = async () => {
      setLoading(true)
      const res = await axios.get('/api/tickets/list')
      setTickets(res.data.tickets)
      setLoading(false)
    }

    fetchTickets()
  }, [])

  // Get current tickets
  const indexOfLastTicket = currentPage * ticketsPerPage
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket)

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)

  // Increase tickets per page
  const increaseTicketsPerPage = e => setTotalUsersPerPage(e.target.value)

  // Increase tickets per page in search
  const increaseTicketsPerPageInSearch = num => setTotalUsersPerPage(num)

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="kt-subheader   kt-grid__item">
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
                        <Link className="btn btn-label-brand btn-bold btn-sm" to="#">Upgrade plan</Link>
                        <Link className="btn btn-clean btn-bold btn-sm" to="#" data-toggle="kt-tooltip" data-placement="right" title="Click to learn more...">Learn more</Link>
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
        <Colxx xxs="4">
          <div className="kt-portlet">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">
                  Add User
                </h3>
              </div>
            </div>



            <form className="kt-form" id="addUser" noValidate>
              <div className="kt-portlet__body">
                <div className="form-group form-group-last">
                <div className="alert alert-success fade show" role="alert">
                  <div className="alert-icon"><i className="flaticon-warning"></i></div>
                  <div className="alert-text">A simple success alert—check it out!</div>
                  <div className="alert-close">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true"><i className="la la-close"></i></span>
                    </button>
                  </div>
                </div>
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Enter full name" />
                </div>
                <div className="form-group row">
                  <div className="col-lg-8">
                    <label>Email address</label>
                    <input name="email" value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    <span className="form-text text-muted">We'll never share your email with anyone else.</span>
                  </div>
                  <div className="col-lg-4">
                    <label>Title</label>
                    <input name="title" value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control" placeholder="Enter username" />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>Description</label>
                    <input name="description" value={description} onChange={e => setDescription(e.target.value)} type="text" className="form-control"  placeholder="Description" />
                  </div>
                  <div className="col-lg-6">
                    <label>Repeat Password</label>
                    <input name="plugin" value={plugin} onChange={e => setPlugin(e.target.value)} type="text" className="form-control" placeholder="Module" />
                  </div>
                </div>

                <div className="form-group form-group-last">
                  <label>Bio</label>
                  <input name="bio" value={specificity} onChange={e => setSpecificity(e.target.value)} type="text" className="form-control" />
                </div>
              </div>
              <div className="kt-portlet__foot">
                <div className="kt-form__actions">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="reset" className="btn btn-secondary">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </Colxx>

        <Colxx xxs="8">
        <div className="kt-grid__item kt-grid__item--fluid">


          <Pagination
            ticketsPerPage={ticketsPerPage}
            increaseTicketsPerPage={increaseTicketsPerPage}
            totalTickets={tickets.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        </Colxx>
      </Row>
    </>
  )
}

export default AddTickets
