import React, { Fragment } from "react"
// import axios from 'axios'
import { injectIntl } from 'react-intl'
import {
  Row
} from 'reactstrap'
// import ReactTable from "react-table"
// import PerfectScrollbar from "react-perfect-scrollbar";
import { Colxx } from '../../../components/CustomBootstrap'
import BreadcrumbContainer from "../../../components/BreadcrumbContainer"
// import DataTablePagination from "../../components/DataTables/pagination"
import IntlMessages from '../../../util/IntlMessages'
import { Link } from "react-router-dom"

import ListDefaultUsers from '../../../components/Dashboard/listDefaultUsers'

var dateFormat = require('dateformat')

const icon_cloud = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon kt-svg-icon--sm"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24" /><path d="M4.875,20.75 C4.63541667,20.75 4.39583333,20.6541667 4.20416667,20.4625 L2.2875,18.5458333 C1.90416667,18.1625 1.90416667,17.5875 2.2875,17.2041667 C2.67083333,16.8208333 3.29375,16.8208333 3.62916667,17.2041667 L4.875,18.45 L8.0375,15.2875 C8.42083333,14.9041667 8.99583333,14.9041667 9.37916667,15.2875 C9.7625,15.6708333 9.7625,16.2458333 9.37916667,16.6291667 L5.54583333,20.4625 C5.35416667,20.6541667 5.11458333,20.75 4.875,20.75 Z" id="check" fill="#000000" fill-rule="nonzero" opacity="0.3" /><path d="M2,11.8650466 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L12.9835977,18 C12.7263047,14.0909841 9.47412135,11 5.5,11 C4.23590829,11 3.04485894,11.3127315 2,11.8650466 Z M6,7 C5.44771525,7 5,7.44771525 5,8 C5,8.55228475 5.44771525,9 6,9 L15,9 C15.5522847,9 16,8.55228475 16,8 C16,7.44771525 15.5522847,7 15,7 L6,7 Z" id="Combined-Shape" fill="#000000" /></g></svg>'

const icon_plus = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon kt-svg-icon--success kt-svg-icon--md"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="Shape" points="0 0 24 0 24 24 0 24" /><path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero" opacity="0.3" /><path d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z" id="Combined-Shape" fill="#000000" /></g></svg>'

var now = new Date();

// let arrData = []

// Define a default UI for filtering
// const DefaultColumnFilter = ({ filterValue, setFilter }) => {
//
//   const [filters, setFilters] = useState([])
//
//   return (
//     <input
//       value={filters || ''}
//       onChange={e => {
//         setFilters(e.target.value || undefined) // Set undefined to remove the filter entirely
//         console.log(e.target.value)
//       }}
//       placeholder="Search..."
//     />
//   )
// }


const UserList = (props) => {

  // Hooks useState
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true)
  // const [errorMessage, setErrorMessage] = useState(null)

  // ===============================================================
  // Hooks useEffect
  // ===============================================================
  // useEffect(() => {
  //   axios
  //     .get('/api/users/list')
  //     .then(response => {
  //
  //       if (response.data.users)
  //         setUsers(response.data.users)
  //     })
  //
  // },[])

  // useEffect(() => {
  //   fetch(`http://localhost:4000/api/users/list`, {mode: 'cors'})
  //     .then(response => response.json())
  //     .then(jsonResponse => {
  //       setUsers(jsonResponse.Search);
  //       setLoading(false);
  //     })
  //   }, [])

    // const search = searchValue => {
    //   setLoading(true);
    //   setErrorMessage(null)
    //
    //
    // fetch(`http://localhost:4000/api/users/list/?s=${searchValue}`)
    //   .then(response => response.json())
    //   .then(jsonResponse => {
    //     if (jsonResponse.Response === "True") {
    //       setUsers(jsonResponse.Search);
    //       setLoading(false);
    //     } else {
    //       setErrorMessage(jsonResponse.Error);
    //       setLoading(false);
    //     }
    //   })
    // }

 //  const filterAll = (e) => {
 //   const { value } = e.target;
 //   const filterAll = value;
 //   const isfiltered = [{ id: 'all', value: filterAll }];
 //   // NOTE: this completely clears any COLUMN filters
 //   setFiltered({ filterAll, filtered });
 //
 //   console.log(filtered)
 // }

  // const columns = [
  //   {
  //     id: '#', // Required because our accessor is not a string
  //     Header: '#',
  //     Cell: function ( data, type, full, counter ) {
  //         return  data.index + 1
  //     },
  //     width: 50,
  //     class: 'center'
  //   }, {
  //     id: 'name', // Required because our accessor is not a string
  //     Header: <IntlMessages id="user.name" />,
  //     accessor: d => <div><img className="userlist_avatar" src={d.avatar ? d.avatar : imgUserDefaultMasculine } alt="avatar" /> {d.name}</div>, // Custom value accessors!
  //     width: 300
  //   }, {
  //     id: 'email', // Required because our accessor is not a string
  //     Header: <IntlMessages id="user.email" />,
  //     accessor: d => d.email, // Custom value accessors!,
  //     width: 230
  //   }, {
  //     id: 'username', // Required because our accessor is not a string
  //     Header: <IntlMessages id="user.username" />,
  //     accessor: d => d.username, // Custom value accessors!
  //     ilterMethod: (filter, row) =>
  //                   row[filter.id].startsWith(filter.value) &&
  //                   row[filter.id].endsWith(filter.value),
  //     width: 120
  //   }, {
  //     id: 'roles', // Required because our accessor is not a string
  //     Header: <IntlMessages id="user.roles" />,
  //     accessor: d => d.roles, // Custom value accessors!
  //     width: 200
  //   }, {
  //     id: 'enabled', // Required because our accessor is not a string
  //     Header: <IntlMessages id="user.enabled" />,
  //     accessor: d => <Input type="checkbox" checked={d.enabled} />, // Custom value accessors!
  //     width: 120
  //   }, {
  //     id: 'locked', // Required because our accessor is not a string
  //     Header: <IntlMessages id="user.locked" />,
  //     accessor: d => <Input type="checkbox" checked={d.locked} />, // Custom value accessors!
  //     width: 120
  //   }, {
  //     id: 'phone', // Required because our accessor is not a string
  //     Header: <IntlMessages id="user.phone" />,
  //     accessor: d => d.phone, // Custom value accessors!
  //     width: 100
  //   }, {
  //     id: 'address', // Required because our accessor is not a string
  //     Header: <IntlMessages id="user.address" />,
  //     accessor: d => d.address, // Custom value accessors!
  //     width: 300
  //   }
  // ]

  // filterUpdated = (newData, filterConfiguration) => {
	// 	this.setState({
	// 		"upddatedData": newData
	// 	});
	// }

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
        <Colxx xxs="12">
          <ListDefaultUsers />
        </Colxx>
      </Row>
    </Fragment>
  )
}

// <Colxx md="12" className="mb-4">
//
//   <Card className="mb-4">
//     <CardBody>
//       <CardTitle>
//       Filter, Length and Jump
//     </CardTitle>
//
//       <DefaultColumnFilter />
//
//
//       <ReactTable
//       className={"react-table-fixed-height table -striped -highlight"}
//       data={users}
//       columns={columns}
//       defaultPageSize={10}
//       useGroupBy
//       useFilters
//       useSortBy
//       useExpanded
//       filterable
//       defaultFilterMethod={(filter, row) =>
//         String(row[filter.id]) === filter.value}
//       />
//     </CardBody>
//   </Card>
// </Colxx>

export default injectIntl(UserList)
