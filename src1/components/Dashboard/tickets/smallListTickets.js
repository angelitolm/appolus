import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import PerfectScrollbar from 'react-perfect-scrollbar'

// Components
import { Colxx } from "../../CustomBootstrap"

//CSS
import 'react-perfect-scrollbar/dist/css/styles.css'

// Images
import imgUserDefaultFame from '../../../assets/img/users/user1.jpg'
import imgUserDefaultMasculine from '../../../assets/img/users/user4.jpg'

const SamallListTickets = () => {
  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [ tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    const fecthTickets = async () => {
      setLoading(true)
      const res = await axios.get('/api/tickets/list')

      const asdTickets = res.data.tickets.reverse()

      setTickets(asdTickets.slice(0, 10))
      setLoading(false)
    }
    fecthTickets()
  }, [])



  return (
    <Colxx md="4" className="mb-4 small-box-tickets">
      <div className="kt-portlet kt-portlet--height-fluid">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">
              Support Tickets
            </h3>
          </div>
          <div className="kt-portlet__head-toolbar">
            <div className="dropdown dropdown-inline">
              <button type="button" className="btn btn-clean btn-sm btn-icon-md btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="flaticon-more-1"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <ul className="kt-nav">
                  <li className="kt-nav__item">
                    <Link to="#" className="kt-nav__link">
                      <i className="kt-nav__link-icon flaticon2-line-chart"></i>
                      <span className="kt-nav__link-text">Reports</span>
                    </Link>
                  </li>
                  <li className="kt-nav__item">
                    <Link to="#" className="kt-nav__link">
                      <i className="kt-nav__link-icon flaticon2-send"></i>
                      <span className="kt-nav__link-text">Messages</span>
                    </Link>
                  </li>
                  <li className="kt-nav__item">
                    <Link to="#" className="kt-nav__link">
                      <i className="kt-nav__link-icon flaticon2-pie-chart-1"></i>
                      <span className="kt-nav__link-text">Charts</span>
                    </Link>
                  </li>
                  <li className="kt-nav__item">
                    <Link to="#" className="kt-nav__link">
                      <i className="kt-nav__link-icon flaticon2-avatar"></i>
                      <span className="kt-nav__link-text">Members</span>
                    </Link>
                  </li>
                  <li className="kt-nav__item">
                    <Link to="#" className="kt-nav__link">
                      <i className="kt-nav__link-icon flaticon2-settings"></i>
                      <span className="kt-nav__link-text">Settings</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="kt-portlet__body">
        <PerfectScrollbar style={{ height: "500px", position: "relative" }}>
          <div className="kt-widget3">

            {tickets.map(ticket => {
              return (
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
                      {ticket.date}
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
            )})}

          </div>
          </PerfectScrollbar>
        </div>
      </div>
    </Colxx>
  )
}

export default SamallListTickets
