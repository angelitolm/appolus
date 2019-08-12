import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Row
} from 'reactstrap'
import { Colxx } from '../../../components/CustomBootstrap'
import { Link } from 'react-router-dom'

// Avatars
import imgUserDefaultMasculine from '../../../assets/img/users/user4.jpg'

const iconSearch = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24"></rect><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" id="Path-2" fill="#000000" fill-rule="nonzero" opacity="0.3"></path><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" id="Path" fill="#000000" fill-rule="nonzero"></path></g></svg>'

const ListTickets = ({tickets, loading, increaseTicketsPerPageInSearch}) => {
  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [search, setSearch] = useState("")
  const [arrtickets, setArrTickets] = useState([])
  const [users, setUsers] = useState([])

  let avatars = []

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    const fetchUsersByTicket = async () => {
      for(let i = 0; i < tickets.length; i++){
      const res = await axios.get(`/api/ticket/comments/list/${tickets[i]._id}`)
      setUsers(res.data.ticketcomments)


      if(res.data.ticketcomments[i] !== undefined)
        return avatars.push(res.data.ticketcomments)
      }
    }

    fetchUsersByTicket()
  }, [])

  console.log("avatars: ", users[0])

  const onChange = e => {
    if (loading) {
      return <div class="loading"></div>
    }
    increaseTicketsPerPageInSearch(1000) // increase tickets per page for search all
    setSearch(e.target.value)
  }

  const filteredTickets = tickets.filter(ticket => {
      return ticket.title.toLowerCase().indexOf(search.toString().toLowerCase()) !== -1
  })

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="alert alert-light alert-elevate fade show" role="alert">
            <div className="alert-icon"><i className="flaticon-warning kt-font-brand"></i></div>
            <div className="alert-text">
              Metronic extends <code>Bootstrap Alert</code> component with a variety of options to provide uniquely looking Alert component that matches the Metronic's design standards.
              <br/>
              For more info please visit the plugin's the component's <a className="kt-link kt-font-bold" href="https://getbootstrap.com/docs/4.3/components/alerts/">Documentation</a>.

            </div>
            <form className="kt-margin-l-0" id="kt_subheader_search_form" style={{ width: "250px" }}>
              <div className="kt-input-icon kt-input-icon--right kt-subheader__search">
                <input onChange={onChange} type="text" className="form-control" placeholder="Search..." id="generalSearch" />
                <span className="kt-input-icon__icon kt-input-icon__icon--right">
                  <span>
                    <div dangerouslySetInnerHTML={{ __html: iconSearch }} />
                  </span>
                </span>
              </div>
            </form>
          </div>
        </Colxx>
      </Row>

      {filteredTickets.map(ticket => (
        <div className="kt-portlet" key={ticket._id}>
          <div className="kt-portlet__body">
            <div className="kt-widget kt-widget--user-profile-3">
              <div className="kt-widget__top">
                <div className="kt-widget__media kt-hidden-">
                  <img src={ticket.avatar ? ticket.avatar : imgUserDefaultMasculine } alt="avatar" />
                </div>
                <div className="kt-widget__pic kt-widget__pic--danger kt-font-danger kt-font-boldest kt-font-light kt-hidden">
                  JM
                </div>
                <div className="kt-widget__content">
                  <div className="kt-widget__head">
                    <a href="/" className="kt-widget__ticketname">
                      {ticket.name}
                      <i className="flaticon2-correct kt-font-success"></i>
                    </a>
                    <div className="kt-widget__action">
                      <button type="button" className="btn btn-label-success btn-sm btn-upper">ask</button>&nbsp;
                      <button type="button" className="btn btn-brand btn-sm btn-upper">hire</button>
                    </div>
                  </div>
                  <div className="kt-widget__subhead">
                    <a href="/"><i className="flaticon2-new-email"></i>{ticket.email}</a>
                    <a href="/"><i className="flaticon2-calendar-3"></i>PR Manager </a>
                    <a href="/"><i className="flaticon2-placeholder"></i>{ticket.address}</a>
                  </div>
                  <div className="kt-widget__info">

                    <div className="kt-widget__desc">
                    <h5 className="kt-widget3__text"><Link to={`/app/tickets/details/${ticket._id}`}>{ticket.title}</Link></h5>
                      I distinguish three main text objektive could be merely to inform people.<br/>
                      A second could be persuade people.You want people to bay objective
                    </div>

                  </div>
                </div>
              </div>
              <div className="kt-widget__bottom">
                <div className="kt-widget__item">
                  <div className="kt-widget__icon">
                    <i className="flaticon-piggy-bank"></i>
                  </div>
                  <div className="kt-widget__details">
                    <span className="kt-widget__title">Earnings</span>
                    <span className="kt-widget__value"><span>$</span>249,500</span>
                  </div>
                </div>
                <div className="kt-widget__item">
                  <div className="kt-widget__icon">
                    <i className="flaticon-confetti"></i>
                  </div>
                  <div className="kt-widget__details">
                    <span className="kt-widget__title">Expenses</span>
                    <span className="kt-widget__value"><span>$</span>164,700</span>
                  </div>
                </div>
                <div className="kt-widget__item">
                  <div className="kt-widget__icon">
                    <i className="flaticon-pie-chart"></i>
                  </div>
                  <div className="kt-widget__details">
                    <span className="kt-widget__title">Net</span>
                    <span className="kt-widget__value"><span>$</span>782,300</span>
                  </div>
                </div>
                <div className="kt-widget__item">
                  <div className="kt-widget__icon">
                    <i className="flaticon-file-2"></i>
                  </div>
                  <div className="kt-widget__details">
                    <span className="kt-widget__title">73 Tasks</span>
                    <a href="/" className="kt-widget__value kt-font-brand">View</a>
                  </div>
                </div>
                <div className="kt-widget__item">
                  <div className="kt-widget__icon">
                    <i className="flaticon-chat-1"></i>
                  </div>
                  <div className="kt-widget__details">
                    <span className="kt-widget__title">648 Comments</span>
                    <Link to={`/app/tickets/details/${ticket._id}`} className="kt-widget__value kt-font-brand">View</Link>
                  </div>
                </div>
                <div className="kt-widget__item">
                  <div className="kt-widget__icon">
                    <i className="flaticon-network"></i>
                  </div>
                  <div className="kt-widget__details">
                    <div className="kt-section__content kt-section__content--solid">
                      <div className="kt-badge kt-badge__pics">
                      {users.map(user => (
                        <a key={user._id} href="/" className="kt-badge__pic" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="John Myer">
                          { user.avatar ? <img src={user.avatar} alt="image1" /> :  <img src={require(`../../../assets/uploads/avatars/${user.avatar}`)} alt="image1" />}
                        </a>
                      ))}


                        <a href="/" className="kt-badge__pic kt-badge__pic--last kt-font-brand">
                          +7
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       ))}
      </>
    )
  }

export default ListTickets
