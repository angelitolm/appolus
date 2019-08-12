import React, { useState } from 'react'
import {
  Row,
  Card,
  CardBody
} from 'reactstrap'
import { Colxx } from '../../../components/CustomBootstrap'

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage, increaseUsersPerPage }) => {
  const [newUsersPerPage, setTotalUsersPerPage] = useState(usersPerPage)

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalUsers / newUsersPerPage); i++) {
    pageNumbers.push(i);
  }

let link = document.querySelector('.lastlink')
  const deshabilitar = () => {
    link.setAttribute("disabled", true)
}

// Increase users per page
const increaseUsers = e => setTotalUsersPerPage(e.target.value)

  return (
    <Row>
      <Colxx xxs="12" style={{ marginBottom: "35px" }}>
        <Card>
          <CardBody>
             <div className="kt-pagination kt-pagination--brand">
               <ul className="kt-pagination__links">
                 <li className="kt-pagination__link--first">
                   <a href="!#" onClick={(e) => {
                       e.preventDefault()
                         paginate(pageNumbers[0])
                       }
                     }><i className="fa fa-angle-double-left kt-font-brand"></i></a>
                 </li>
                 <li className="kt-pagination__link--next">
                   <a href="!#" onClick={(e) => {
                       e.preventDefault()
                       if((currentPage-1) <= 0)
                         return deshabilitar()

                         paginate(currentPage - 1)
                       }
                     }><i className="fa fa-angle-left kt-font-brand"></i></a>
                 </li>
                 {pageNumbers.map(number => (
                   <li key={number}>
                     <a onClick={(e) => {
                         e.preventDefault()
                           paginate(number)
                         }
                       }
                       href='!#' className={number === parseInt(currentPage) ? "kt-pagination__link--active" : ""}>
                       {number}
                     </a>
                   </li>
                  ))}
                 <li className="kt-pagination__link--prev lastlink">
                   <a href="!#" onClick={(e) => {
                         e.preventDefault()

                         // console.log("currentPage", currentPage)
                         // console.log("pageNumbers", pageNumbers)

                         if((currentPage) > pageNumbers.length - 1) {
                           deshabilitar()
                           return paginate(currentPage)
                         }


                         if((currentPage+1) > parseInt(totalUsers / usersPerPage)+1)
                           return deshabilitar()

                         return paginate(currentPage + 1)
                       }
                     }><i className="fa fa-angle-right kt-font-brand"></i></a>
                 </li>
                 <li className="kt-pagination__link--last">
                   <a href="!#" onClick={(e) => {
                         e.preventDefault()

                         paginate(pageNumbers.length)
                       }
                     }><i className="fa fa-angle-double-right kt-font-brand"></i></a>
                 </li>
               </ul>
               <div className="kt-pagination__toolbar">
                 <select className="form-control kt-font-brand" style={{ width: "60px"}} onClick={(e) => {increaseUsersPerPage(e); increaseUsers(e) }} >
                 <option value="3">3</option>
                 <option value="5">5</option>
                 <option value="10">10</option>
                 <option value="20">20</option>
                 <option value="30">30</option>
                 <option value="50">50</option>
                 <option value="100">100</option>
                 </select>
                 <span className="pagination__desc">
                   Displaying {usersPerPage} of {totalUsers} records
                 </span>
               </div>
             </div>
           </CardBody>
         </Card>
       </Colxx>
     </Row>
  )
}

export default Pagination;
