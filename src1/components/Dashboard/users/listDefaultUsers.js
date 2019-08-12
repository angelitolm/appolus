import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { injectIntl } from 'react-intl'
import IntlMessages from '../../../util/IntlMessages'

import ListUsers from './Users'
import Pagination from './Pagination'

const ListDefaulUsers = (props) => {


  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setTotalUsersPerPage] = useState(3);

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const res = await axios.get('/api/users/list')
      setUsers(res.data.users)
      setLoading(false)
    };

    fetchUsers()
  }, [])

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)

  // Increase users per page
  const increaseUsersPerPage = e => setTotalUsersPerPage(e.target.value)

  // Increase users per page in search
  const increaseUsersPerPageInSearch = num => setTotalUsersPerPage(num)

  return (
    <>
      <div className="kt-grid__item kt-grid__item--fluid" id="kt_content">
        <ListUsers users={currentUsers} loading={loading} increaseUsersPerPageInSearch={increaseUsersPerPageInSearch} />
        <Pagination
          usersPerPage={usersPerPage}
          increaseUsersPerPage={increaseUsersPerPage}
          totalUsers={users.length}
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
)(injectIntl(ListDefaulUsers))
