import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { injectIntl } from 'react-intl'
import IntlMessages from '../../util/IntlMessages'
import {
  Row,
  Card,
  CardBody
} from 'reactstrap'
import { Colxx } from '../../components/CustomBootstrap'

// Avatars
import imgUserDefaultMasculine from '../../assets/img/users/user4.jpg'

const iconSearch = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24"></rect><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" id="Path-2" fill="#000000" fill-rule="nonzero" opacity="0.3"></path><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" id="Path" fill="#000000" fill-rule="nonzero"></path></g></svg>'

const renderUser = (user) => {
// if( search !== "" && user.name.toString().toLowerCase().indexOf( search.toString().toLowerCase() ) === -1 ){
//   console.log(user.name.toLowerCase())
//     return user.name.indexOf(search) !== -1
// }

return (
  <div className="kt-portlet" key={user._id}>
    <div className="kt-portlet__body">
      <div className="kt-widget kt-widget--user-profile-3">
        <div className="kt-widget__top">
          <div className="kt-widget__media kt-hidden-">
            <img src={user.avatar ? user.avatar : imgUserDefaultMasculine } alt="avatar" />
          </div>
          <div className="kt-widget__pic kt-widget__pic--danger kt-font-danger kt-font-boldest kt-font-light kt-hidden">
            JM
          </div>
          <div className="kt-widget__content">
            <div className="kt-widget__head">
              <a href="/" className="kt-widget__username">
                {user.name}
                <i className="flaticon2-correct kt-font-success"></i>
              </a>
              <div className="kt-widget__action">
                <button type="button" className="btn btn-label-success btn-sm btn-upper">ask</button>&nbsp;
                <button type="button" className="btn btn-brand btn-sm btn-upper">hire</button>
              </div>
            </div>
            <div className="kt-widget__subhead">
              <a href="/"><i className="flaticon2-new-email"></i>{user.email}</a>
              <a href="/"><i className="flaticon2-calendar-3"></i>PR Manager </a>
              <a href="/"><i className="flaticon2-placeholder"></i>{user.address}</a>
            </div>
            <div className="kt-widget__info">
              <div className="kt-widget__desc">
                I distinguish three main text objektive could be merely to inform people.<br/>
                A second could be persuade people.You want people to bay objective
              </div>
              <div className="kt-widget__progress">
                <div className="kt-widget__text">
                  Progress
                </div>
                <div className="progress" style={{ height: '5px', width: '100%'}}>
                  <div className="progress-bar kt-bg-success" role="progressbar" style={{ width: "65%"}} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="kt-widget__stats">
                  78%
                </div>
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
              <a href="/" className="kt-widget__value kt-font-brand">View</a>
            </div>
          </div>
          <div className="kt-widget__item">
            <div className="kt-widget__icon">
              <i className="flaticon-network"></i>
            </div>
            <div className="kt-widget__details">
              <div className="kt-section__content kt-section__content--solid">
                <div className="kt-badge kt-badge__pics">
                  <a href="/" className="kt-badge__pic" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="John Myer">
                    <img src="./assets/media/users/100_7.jpg" alt="image1" />
                  </a>
                  <a href="/" className="kt-badge__pic" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="Alison Brandy">
                    <img src="./assets/media/users/100_3.jpg" alt="image2" />
                  </a>
                  <a href="/" className="kt-badge__pic" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="Selina Cranson">
                    <img src="./assets/media/users/100_2.jpg" alt="image3" />
                  </a>
                  <a href="/" className="kt-badge__pic" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="Luke Walls">
                    <img src="./assets/media/users/100_13.jpg" alt="image4" />
                  </a>
                  <a href="/" className="kt-badge__pic" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="Micheal York">
                    <img src="./assets/media/users/100_4.jpg" alt="image5" />
                  </a>
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
)
}



const ListDefaulUsers = (props) => {


  // ===============================================================
  // Hooks useState
  // ===============================================================
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [total_page, setTotalPage] = useState(0)
  // const [new_total_page, setNewTotalPage] = useState([])
  const [perpage, setPerPage] = useState()
  const [current_page, setCurrentPage] = useState(null)


  const handleClick = (num) => {
    setPerPage(num)
    renderUser(users.slice(0, perpage))
  }


  let rounded = 0
  let total_moment = (users.length / perpage)

  const getTotal = () => {
    rounded = total_moment.toString().split(".")

     if (parseFloat(users.length / perpage) % 1 !== 0)
       return setTotalPage(parseInt(rounded[0])+1)

     setTotalPage(users.length / perpage)
  }

  useEffect(() => {
    loadData()
    getTotal()
    // handleClick(5)
    // getNewTotal()

  })

  const new_total_page = []

  // const getNewTotal = () => {
    if (total_page > 0) {
      for (let i = 1; i <= total_page; i++){
        // setNewTotalPage(i)
        new_total_page.push(i)
      }
    }
  // }



  const onChange = e => {
    setSearch(e.target.value)
  }

  const filteredUsers = users.filter(user => {
      return user.name.toLowerCase().indexOf(search.toString().toLowerCase()) !== -1
  })

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  useEffect(() => {
    // setTotalPage(users.length / perpage)
    axios
      .get('/api/users/list')
      .then(response => {

        setTotalPage(response.data.users.length / perpage)
        // setUsers(response.data.users)

        if (response.data.users) {
          setUsers(response.data.users)
          // setUsers((response.data.users).slice(0, perpage))
        }
      })
  },[perpage])

  // On load default data
  const loadData = () => {
    if (perpage === undefined){
      setTotalPage(users.length / perpage)
      setPerPage(2)
      // users.slice(0, perpage)
    }
  }

  console.log("total users:",users)
  console.log("total per page:",perpage)
  console.log("total page:",total_page)

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="alert alert-light alert-elevate fade show" role="alert">
            <div className="alert-icon"><i className="flaticon-warning kt-font-brand"></i></div>
            <div className="alert-text">
              Metronic extends <code>Bootstrap Alert</code> component with a variety of options to provide uniquely looking Alert component that matches the Metronic's design standards.
              <br/>
              For more info please visit the plugin's the component's <a className="kt-link kt-font-bold" href="https://getbootstrap.com/docs/4.3/components/alerts/" target="_blank">Documentation</a>.<br/><br/>
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
          </div>

        </Colxx>
      </Row>

      <div className="kt-grid__item kt-grid__item--fluid" id="kt_content">
        {filteredUsers.map(user => {
                return renderUser(user);
              })
        }
      </div>


     <Row>
       <Colxx xxs="12" style={{ marginBottom: "35px" }}>
         <Card>
           <CardBody>
        			<div className="kt-pagination kt-pagination--brand">
        				<ul className="kt-pagination__links">
                  <li className="kt-pagination__link--first">
                    <a href="/"><i className="fa fa-angle-double-left kt-font-brand"></i></a>
                  </li>
                  <li className="kt-pagination__link--next">
                    <a href="/"><i className="fa fa-angle-left kt-font-brand"></i></a>
                  </li>
                  {new_total_page.map(numpages =>
                    <li key={numpages}>
          						<a href="/">{numpages}</a>
          					</li>
                  )}
        					<li className="kt-pagination__link--prev">
        						<a href="/"><i className="fa fa-angle-right kt-font-brand"></i></a>
        					</li>
        					<li className="kt-pagination__link--last">
        						<a href="/"><i className="fa fa-angle-double-right kt-font-brand"></i></a>
        					</li>
        				</ul>
        				<div className="kt-pagination__toolbar">
        					<select className="form-control kt-font-brand" style={{ width: "60px"}} onClick={e => {handleClick(e.target.value); setUsers(users.slice(0, e.target.value)) }}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
        					</select>
        					<span className="pagination__desc">
        						Displaying 10 of 230 records
        					</span>
        				</div>
        			</div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  )
}

ListDefaulUsers.propTypes = {
  // search: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  const search = state.search
  return { search }
}

export default connect(
  mapStateToProps,
)(injectIntl(ListDefaulUsers))
