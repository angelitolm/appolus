// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Appolus
  Author: Angel Labrada Mass贸
 */

// ===============================================================
// Import Modules
// ===============================================================
import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import { Separator } from '../../components/CustomBootstrap'

// ===============================================================
// Components
// ===============================================================
import Navbar from '../../containers/Navbar'
import HeaderTop from '../../components/Frontend/HeaderTop'
import Header from '../../components/Frontend/Header'
import Sectiona from '../../components/Frontend/Sectiona'

function homePage () {

    return (
      <div>
        <Navbar />
        <main className="mymain">
    			<div className="container">
					  <div className="dashboard-wrapper">
              <Header />
              <Sectiona />
            </div>
          </div>
        </main>
      </div>
    )
}

export default homePage
