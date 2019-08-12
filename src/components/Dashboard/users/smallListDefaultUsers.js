import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import PerfectScrollbar from 'react-perfect-scrollbar'

// Components
import { Colxx } from "../../CustomBootstrap"
import LoadingSmallListUsers from './LoadingSmallListUsers'

//CSS
import 'react-perfect-scrollbar/dist/css/styles.css'

// Images
import imgUserDefaultFame from '../../../assets/img/users/user1.jpg'
import imgUserDefaultMasculine from '../../../assets/img/users/user4.jpg'

const SmallListUsers = () => {
  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [ users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    const fecthTickets = async () => {
      setLoading(true)
      const res = await axios.get('/api/users/list')

      const asdUsers = res.data.users.reverse()

      setUsers(asdUsers.slice(0, 10))
      setLoading(false)
    }
    fecthTickets()
  }, [])


  if(loading)
    return <LoadingSmallListUsers />

  return (
    <Colxx md="4" className="mb-4">
      <div className="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">
              New Users
            </h3>
          </div>
        </div>
        <div className="kt-portlet__body">
          <div className="kt-widget4">
            <PerfectScrollbar style={{ height: "500px", position: "relative" }}>
              {users.map(user => (
                <div className="kt-widget4__item" key={user._id}>
                  <div className="kt-widget4__pic kt-widget4__pic--pic">
                    <img src={user.avatar ? user.avatar : imgUserDefaultMasculine } alt="avatar" />
                  </div>
                  <div className="kt-widget4__info">
                    <Link to="#" className="kt-widget4__username">
                      {user.name}
                    </Link>
                    <p className="kt-widget4__text">
                      {user.occupation}, {user.factory}
                    </p>
                  </div>
                  <Link to="#" className="btn btn-sm btn-label-brand btn-bold">Follow</Link>
                </div>
               ))}
             </PerfectScrollbar>
          </div>
        </div>
      </div>
    </Colxx>
  )
}

export default SmallListUsers
