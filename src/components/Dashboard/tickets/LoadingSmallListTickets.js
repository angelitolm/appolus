import React from 'react'
import { Link } from "react-router-dom"

// Components
import { Colxx } from "../../CustomBootstrap"

const LoadingSmallListTickets = () => {
  return (
    <Colxx md="4" className="mb-4 small-box-tickets">
      <div className="kt-portlet kt-portlet--height-fluid">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">
              Support Tickets
            </h3>
          </div>
        </div>

        <div className="kt-portlet__body">
          <div className="kt-widget3">

          <div className="kt-widget3__item">
            <div className="kt-widget3__header">
              <div className="kt-widget3__user-img">
                <div className="loading-small-tickets-avatar">L</div>
              </div>
              <div className="kt-widget3__info">
                <Link to="#" className="kt-widget3__username loading-small-tickets">
                  <span>Loading...</span> <span>LoadingLoading...</span> <span>Loading...</span>
                </Link><br />
                <span className="kt-widget3__time loading-small-tickets">
                  <span>Loading...</span>
                </span>
              </div>
              <span className="kt-widget3__status kt-font-info">
                <span className="kt-badge kt-badge--inline loading-small-tickets">
                  <span>Loading...</span>
                </span>
              </span>
            </div>
            <div className="kt-widget3__body">
              <h6 className="kt-widget3__text loading-small-tickets"><span>LoadingLoading...</span> <span>Loading...</span> <span>Loading...</span></h6>
              <p className="kt-widget3__text loading-small-tickets">
                <span>LoadingLoadingLoading...</span> <span>Loading...</span> <span>LoadingLoading...</span> <span>Loading...</span>
                <span>Loading...</span> <span>LoadingLoading...</span> <span>Loading...</span> <span>LoadingLoadingLoading...</span>
              </p>
            </div>
          </div>

            <div className="kt-widget3__item">
              <div className="kt-widget3__header">
                <div className="kt-widget3__user-img">
                  <div className="loading-small-tickets-avatar">L</div>
                </div>
                <div className="kt-widget3__info">
                  <Link to="#" className="kt-widget3__username loading-small-tickets">
                    <span>Loading...</span> <span>LoadingLoading...</span> <span>Loading...</span>
                  </Link><br />
                  <span className="kt-widget3__time loading-small-tickets">
                    <span>Loading...</span>
                  </span>
                </div>
                <span className="kt-widget3__status kt-font-info">
                  <span className="kt-badge kt-badge--inline loading-small-tickets">
                    <span>Loading...</span>
                  </span>
                </span>
              </div>
              <div className="kt-widget3__body">
                <h6 className="kt-widget3__text loading-small-tickets"><span>LoadingLoading...</span> <span>Loading...</span> <span>Loading...</span></h6>
                <p className="kt-widget3__text loading-small-tickets">
                  <span>LoadingLoadingLoading...</span> <span>Loading...</span> <span>LoadingLoading...</span> <span>Loading...</span>
                  <span>Loading...</span> <span>LoadingLoading...</span> <span>Loading...</span> <span>LoadingLoadingLoading...</span>
                </p>
              </div>
            </div>

            <div className="kt-widget3__item">
              <div className="kt-widget3__header">
                <div className="kt-widget3__user-img">
                  <div className="loading-small-tickets-avatar">L</div>
                </div>
                <div className="kt-widget3__info">
                  <Link to="#" className="kt-widget3__username loading-small-tickets">
                    <span>Loading...</span> <span>LoadingLoading...</span> <span>Loading...</span>
                  </Link><br />
                  <span className="kt-widget3__time loading-small-tickets">
                    <span>Loading...</span>
                  </span>
                </div>
                <span className="kt-widget3__status kt-font-info">
                  <span className="kt-badge kt-badge--inline loading-small-tickets">
                    <span>Loading...</span>
                  </span>
                </span>
              </div>
              <div className="kt-widget3__body">
                <h6 className="kt-widget3__text loading-small-tickets"><span>LoadingLoading...</span> <span>Loading...</span> <span>Loading...</span></h6>
                <p className="kt-widget3__text loading-small-tickets">
                  <span>LoadingLoadingLoading...</span> <span>Loading...</span> <span>LoadingLoading...</span> <span>Loading...</span>
                  <span>Loading...</span> <span>LoadingLoading...</span> <span>Loading...</span> <span>LoadingLoadingLoading...</span>
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Colxx>
  )
}

export default LoadingSmallListTickets
