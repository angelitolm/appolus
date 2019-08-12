import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { injectIntl } from 'react-intl'
import IntlMessages from '../../../util/IntlMessages'

import ListTickets from './Tickets'
import Pagination from './Pagination'

const ListDefaulTickets = (props) => {
  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [ticketsPerPage, setTotalTicketsPerPage] = useState(3);

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      const res = await axios.get('/api/tickets/list')
      setTickets(res.data.tickets)
      setLoading(false)
    }

    fetchTickets()
  }, [])

  // console.log("array de tickets: ", tickets)

  // Get current tickets
  const indexOfLastTicket = currentPage * ticketsPerPage
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket)

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)

  // Increase tickets per page
  const increaseTicketsPerPage = e => setTotalTicketsPerPage(e.target.value)

  // Increase tickets per page in search
  const increaseTicketsPerPageInSearch = num => setTotalTicketsPerPage(num)

  return (
    <>
      <div className="kt-grid__item kt-grid__item--fluid" id="kt_content">
        <ListTickets tickets={currentTickets} loading={loading} increaseTicketsPerPageInSearch={increaseTicketsPerPageInSearch} />
        <Pagination
          ticketsPerPage={ticketsPerPage}
          increaseTicketsPerPage={increaseTicketsPerPage}
          totalTickets={tickets.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  )

}

const mapStateToProps = state => {
  const search = state.search
  return { search }
}


export default connect(
  mapStateToProps,
)(injectIntl(ListDefaulTickets))
